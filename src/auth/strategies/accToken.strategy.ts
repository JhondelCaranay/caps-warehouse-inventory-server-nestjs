import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../types";

@Injectable()
export class AccTokenStrategy extends PassportStrategy(Strategy, "jwt") {
    // constructor(private readonly configService: ConfigService) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // secretOrKey: configService.get("ACCES_JWT_SECRET"),
            secretOrKey: process.env.ACCES_JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload) {
        return payload;
        // stored in req.user = payload
    }
}
