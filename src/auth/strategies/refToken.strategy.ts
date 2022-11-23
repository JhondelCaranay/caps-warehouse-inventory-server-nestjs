import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    // constructor(private readonly configService: ConfigService) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // secretOrKey: configService.get("ACCES_JWT_SECRET"),
            secretOrKey: process.env.REFRESH_JWT_SECRET,
            passReqToCallback: true, // get the payload and also the token from header
        });
    }

    async validate(req: Request, payload: any) {
        const refreshToken = req.get("authorization").split(" ")[1];
        const data = { refreshToken, ...payload };
        console.log("🚀 ~ file: refToken.strategy.ts ~ line 21 ~ RefTokenStrategy ~ validate ~ data", data);
        return data;
        // req.user = { refreshToken, ...payload }
    }
    // throw new UnauthorizedException() STATUS 401 ; when the token is invalid or expired
}
