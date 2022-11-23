import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccTokenStrategy, RefTokenStrategy } from "./strategies";

// JwtModule - nest js library a wrapper around jsonwebtoken
@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, AccTokenStrategy, RefTokenStrategy],
})
export class AuthModule {}
