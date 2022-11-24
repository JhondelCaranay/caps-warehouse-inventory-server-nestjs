import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ForbiddenException } from "@nestjs/common/exceptions";
import { Tokens } from "./types";
import { Injectable } from "@nestjs/common/decorators";
import * as argon from "argon2";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async signup(dto: AuthDto): Promise<Tokens> {
        // const hash = await this.hashData(dto.password);
        const hash = await argon.hash(dto.password);

        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: hash,
            },
        });

        await this.prisma.profile.create({
            data: {
                userId: newUser.id,
            },
        });

        // generate access token and refresh token
        const access_token = this.getAccessToken(newUser.id, newUser.email);
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
        const access_token = this.getAccessToken(user.id, user.email);
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
        const access_token = this.getAccessToken(user.id, user.email);
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

    getAccessToken(userId: string, email: string) {
        return this.jwtService.sign(
            {
                sub: userId,
                email,
            },
            {
                expiresIn: "15m",
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

    // async hashData(data: string) {
    //     // salt
    //     const salt = await bcrypt.genSalt(10);
    //     // hash
    //     return await bcrypt.hash(data, salt);
    // }
}
