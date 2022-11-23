import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable() // Injectable decorator is required when using dependency injection in constructor
export class AtGuard extends AuthGuard("jwt") {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride("isPublic", [context.getHandler(), context.getClass()]);

        if (isPublic) return true;

        return super.canActivate(context);
    }
}
