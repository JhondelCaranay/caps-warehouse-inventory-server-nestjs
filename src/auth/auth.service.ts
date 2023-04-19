import { NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto, ForgotPasswordDto, ResetCodeDto, SignupDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ForbiddenException } from "@nestjs/common/exceptions";
import { Tokens } from "./types";
import { Injectable } from "@nestjs/common/decorators";
import * as argon from "argon2";
import { sendToEmail } from "src/common/utils/sendToEmail";
import { codeGenerator } from "src/common/utils";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async signup(dto: SignupDto): Promise<Tokens> {
        // const hash = await this.hashData(dto.password);
        const hash = await argon.hash(dto.password);

        const profile = await this.prisma.profile.create({
            data: {
                first_name: dto.first_name.toLowerCase(),
                last_name: dto.last_name.toLowerCase(),
            },
        });

        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: hash,
                profileId: profile.id,
            },
        });

        // generate access token and refresh token
        const access_token = this.getAccessToken(newUser.id, newUser.email, newUser.role);
        const refresh_token = this.getRefreshToken(newUser.id, newUser.email);
        // update user hashed refresh token
        await this.updateHashRt(newUser.id, refresh_token);

        return {
            access_token,
            refresh_token,
        };
    }

    async signin(dto: AuthDto): Promise<Tokens> {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) {
            throw new ForbiddenException("Invalid credentials");
        }

        // const passwordMatch = await bcrypt.compare(dto.password, user.hash);
        const passwordMatch = await argon.verify(user.hash, dto.password);

        if (!passwordMatch) {
            throw new ForbiddenException("Invalid credentials");
        }

        // generate access token and refresh token
        const access_token = this.getAccessToken(user.id, user.email, user.role);
        const refresh_token = this.getRefreshToken(user.id, user.email);

        // update user hashed refresh token
        await this.updateHashRt(user.id, refresh_token);

        return {
            access_token,
            refresh_token,
        };
    }

    async signout(userId: string): Promise<string> {
        await this.prisma.user.updateMany({
            where: { id: userId },
            data: { hashRT: null },
        });

        return userId;
    }

    async refresh(userId: string, rt: string): Promise<Tokens> {
        // rt = refresh token
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user && !user.hashRT) {
            throw new ForbiddenException("Access denied");
        }

        // const rtMatch = await bcrypt.compare(rt, user.hashRT);
        const rtMatch = await argon.verify(user.hashRT, rt);

        if (!rtMatch) {
            throw new ForbiddenException("Access denied");
        }

        // generate access token and refresh token
        const access_token = this.getAccessToken(user.id, user.email, user.role);
        const refresh_token = this.getRefreshToken(user.id, user.email);

        // update user hashed refresh token
        await this.updateHashRt(user.id, refresh_token);

        return {
            access_token,
            refresh_token,
        };
    }

    async me() {
        return "me";
    }

    getAccessToken(userId: string, email: string, role: string) {
        return this.jwtService.sign(
            {
                sub: userId,
                email,
                role,
            },
            {
                expiresIn: "1d", // turn it back to 15min after loginPerisist is done
                secret: process.env.ACCES_JWT_SECRET,
            },
        );
    }

    getRefreshToken(userId: string, email: string) {
        return this.jwtService.sign(
            {
                sub: userId,
                email,
            },
            {
                expiresIn: "7d",
                secret: process.env.REFRESH_JWT_SECRET,
            },
        );
    }

    async updateHashRt(userId: string, rt: string) {
        // hash refresh token
        // const hash = await this.hashData(refreshToken);
        const hash = await argon.hash(rt);

        // update user hashed refresh token
        return await this.prisma.user.update({
            where: { id: userId },
            data: { hashRT: hash },
        });
    }

    async forgotPassword(dto: ForgotPasswordDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
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

        if (!user) {
            throw new NotFoundException(`Email ${dto.email} not found`);
        }

        // make a temporary password
        const generateCode = codeGenerator(6);
        const resetPasswordToken = await argon.hash(generateCode);

        // expire in 5 minutes
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: resetPasswordToken,
                resetPasswordExp: expires,
            },
        });

        await sendToEmail({
            email: user.email,
            subject: "Forgot Password",
            text: "Forgot Password",
            html: `
            <div style="background-color: #f5f5f5; padding: 20px;">
                <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
                    <div style="text-align: center;">
                        <img src="https://ph.joblum.com/uploads/22/21338.jpg" alt="logo" border="0" style="width: 100px; height: 100px;">
                    </div>
                    <h3 style="text-align: center; margin: 0px;">Use this reset code to confirm your account.</h3>
                    <p style="text-align: center;">Code: <b>${generateCode}</b>. <br />Expires in ${expires.toLocaleTimeString()}.</p>
                </div>
            </div>
            `,
        });

        return user;
    }

    async resetCode(dto: ResetCodeDto) {
        // dto contains code and email
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) {
            throw new NotFoundException(`Email ${dto.email} not found`);
        }

        // check if code is valid
        const codeMatch = await argon.verify(user.resetPasswordToken, dto.code);

        if (!codeMatch) {
            throw new ForbiddenException("Invalid code");
        }

        // check if code is expired
        const now = new Date();
        const isExpired = now > user.resetPasswordExp;

        console.log(isExpired);

        if (isExpired) {
            throw new ForbiddenException("Code expired");
        }

        // user need to reset password
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                isNeedChangePassword: true,
            },
        });

        // gennerate tokens
        const access_token = this.getAccessToken(user.id, user.email, user.role);
        const refresh_token = this.getRefreshToken(user.id, user.email);

        // update user hashed refresh token
        await this.updateHashRt(user.id, refresh_token);

        return {
            access_token,
            refresh_token,
        };
    }

    // async hashData(data: string) {
    //     // salt
    //     const salt = await bcrypt.genSalt(10);
    //     // hash
    //     return await bcrypt.hash(data, salt);
    // }
}
