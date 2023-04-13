import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { ROLE } from "@prisma/client";

@Injectable()
export class UserModel {
    constructor(private prisma: PrismaService) {}

    async createUser(dto: CreateUserDto, hash: string, profileId: string) {
        return await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: hash,
                role: dto.role,
                status: dto.status || undefined,
                profileId: profileId,
            },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                status: true,
                role: true,
                profileId: true,
                Profile: true,
            },
        });
    }

    async createProfile(dto: CreateUserDto) {
        return await this.prisma.profile.create({
            data: {
                first_name: dto.first_name,
                last_name: dto.last_name,
                position: dto.position,
                address: dto.address || undefined,
                contact: dto.contact || undefined,
                avatarUrl: dto.avatarUrl || undefined,
            },
        });
    }

    async getMyProfile(id: string) {
        return await this.prisma.user.findUnique({
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
                Profile: true,
                isNeedChangePassword: true,
            },
        });
    }

    async findAllEngineers() {
        return await this.prisma.user.findMany({
            where: {
                role: ROLE.ENGINEER,
            },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                status: true,
                role: true,
                profileId: true,
                Profile: true,
            },
        });
    }

    async findAll() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                status: true,
                role: true,
                profileId: true,
                Profile: true,
            },
        });
    }

    async findOne(id: string) {
        return await this.prisma.user.findUnique({
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
                Profile: true,
            },
        });
    }

    async findOneByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    async update(id: string, dto: UpdateUserDto) {
        return await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                role: dto.role || undefined,
                status: dto.status || undefined,
                Profile: {
                    update: {
                        first_name: dto.first_name || undefined,
                        last_name: dto.last_name || undefined,
                        position: dto.position || undefined,
                        address: dto.address || undefined,
                        contact: dto.contact || undefined,
                        avatarUrl: dto.avatarUrl || undefined,
                    },
                },
            },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                status: true,
                role: true,
                profileId: true,
                Profile: true,
            },
        });
    }

    async changePassword(id: string, hash: string) {
        return await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                hash: hash,
                isNeedChangePassword: false,
            },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                status: true,
                role: true,
                profileId: true,
                Profile: true,
            },
        });
    }
}
