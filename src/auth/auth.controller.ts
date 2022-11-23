import { Body, Controller, Get, Post, HttpCode, UseGuards, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Tokens } from "./types";
import { RtGuard } from "src/common/guards";
import { GetCurrentUser, GetCurrentUserId, Public } from "src/common/decorators";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post("signup")
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signup(dto);
    }

    @Public()
    @Post("signin")
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signin(dto);
    }

    // @UseGuards(AtGuard)
    @Post("signout")
    @HttpCode(HttpStatus.OK)
    signout(@GetCurrentUser("sub") userId: string) {
        // signout(@GetCurrentUser("sub") userId: string)
        return this.authService.signout(userId);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    refresh(@GetCurrentUserId() userId: string, @GetCurrentUser("refreshToken") refreshToken: string): Promise<Tokens> {
        return this.authService.refresh(userId, refreshToken);
    }

    // @UseGuards(AtGuard)
    @Get("me")
    @HttpCode(HttpStatus.OK)
    me() {
        return this.authService.me();
    }

    // @UseGuards(AuthGuard("jwt"))
    // @Post("signout")
    // @HttpCode(HttpStatus.OK)
    // signout(@Req() req: Request) {
    //     const user = req.user;
    //     return this.authService.signout(user["sub"]);
    // }

    // @UseGuards(AuthGuard("jwt-refresh"))
    // @Post("refresh")
    // @HttpCode(HttpStatus.OK)
    // refresh(@Req() req: Request): Promise<Tokens> {
    //     const user = req.user;
    //     return this.authService.refresh(user["sub"], user["refreshToken"]);
    // }
}
