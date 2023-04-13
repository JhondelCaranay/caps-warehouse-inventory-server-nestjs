import { codeGenerator } from "../common/utils/codeGenerator.util";
import { sendToSmtpTempPassword } from "../common/utils/smtp.util";
import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from "./dto";
import * as argon from "argon2";
import { UserModel } from "./user.model";

@Injectable()
export class UserService {
    constructor(private userModel: UserModel) {}

    async create(dto: CreateUserDto) {
        //check duplicate email
        const user = await this.userModel.findOneByEmail(dto.email);
        if (user) throw new BadRequestException(`Email already exists!`);

        // make a temporary password
        const generateCode = codeGenerator(6);
        const hash = await argon.hash(generateCode);

        // create profile first before creating user
        const profile = await this.userModel.createProfile(dto);
        const newUser = await this.userModel.createUser(dto, hash, profile.id);

        // send temporary password to email
        await sendToSmtpTempPassword(newUser.email, generateCode);

        return newUser;
    }

    async getMyProfile(id: string) {
        // check if user exists, throw a 404 error if not found
        const user = await this.userModel.findOne(id);
        if (!user) throw new NotFoundException(`User id not found!`);

        const profile = await this.userModel.getMyProfile(id);
        return profile;
    }

    async getAllEngineers() {
        const users = await this.userModel.findAllEngineers();
        return users;
    }

    async findAll() {
        const users = await this.userModel.findAll();
        return users;
    }

    async findOne(id: string) {
        // check if user exists, throw a 404 error if not found
        const user = await this.userModel.findOne(id);
        if (!user) throw new NotFoundException(`User id not found!`);
        return user;
    }

    async update(id: string, dto: UpdateUserDto) {
        // check if user exists, throw a 404 error if not found
        const isUserExists = await this.userModel.findOne(id);
        if (!isUserExists) throw new NotFoundException(`User id not found!`);

        const user = await this.userModel.update(id, dto);
        return user;
    }

    async changePassword(userId: string, dto: UpdatePasswordDto) {
        const hash = await argon.hash(dto.password);
        const user = await this.userModel.changePassword(userId, hash);
        return user;
    }

    // remove(id: string) {
    //     return `This action removes a #${id} user`;
    // }
}
