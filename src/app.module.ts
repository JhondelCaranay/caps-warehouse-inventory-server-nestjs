import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { APP_GUARD } from "@nestjs/core";
import { AtGuard } from "./common/guards";
import { CategoryModule } from "./category/category.module";
import { BrandModule } from "./brand/brand.module";
import { ProjectModule } from "./project/project.module";

@Module({
    imports: [PrismaModule, AuthModule, UserModule, CategoryModule, BrandModule, ProjectModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
    ],
})
export class AppModule {}
