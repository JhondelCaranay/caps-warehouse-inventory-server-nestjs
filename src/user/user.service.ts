import { codeGenerator } from "./../common/utils/PasswordGenerator.utils";
import { sendToSmtpTempPassword } from "./../common/utils/smtp.utils";
import { PrismaService } from "./../prisma/prisma.service";
import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto";
import * as argon from "argon2";
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateUserDto) {
        //check duplicate email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (user) throw new BadRequestException(`Email already exists!`);

        const generateCode = codeGenerator(6);
        const hash = await argon.hash(generateCode);

        const profile = await this.prisma.profile.create({
            data: {
                first_name: dto.first_name.toLowerCase(),
                last_name: dto.last_name.toLowerCase(),
                position: dto.position,
            },
        });

        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: hash,
                role: dto.role,
                profileId: profile.id,
            },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                status: true,
                role: true,
                profileId: true,
            },
        });

        await sendToSmtpTempPassword(newUser.email, generateCode);

        return newUser;
    }

    async findAll() {
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                status: true,
                role: true,
                profileId: true,
            },
        });
        return users;
    }

    async findOne(id: string) {
        // check if category exists, throw a 404 error if not found
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                status: true,
                role: true,
                profileId: true,
            },
        });

        if (!user) throw new NotFoundException(`User id not found!`);

        return user;
    }

    async update(id: string, dto: UpdateUserDto) {
        console.log("🚀 ~ file: user.service.ts ~ line 43 ~ UserService ~ update ~ dto", dto);
        await this.findOne(id); // check if category exists , throw a 404 error if not found

        const updatedUser = await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                role: dto.role || undefined,
                status: dto.status || undefined,
            },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                status: true,
                role: true,
                profileId: true,
            },
        });

        return updatedUser;
    }

    // remove(id: string) {
    //     return `This action removes a #${id} user`;
    // }
}
