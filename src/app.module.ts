import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AtGuard } from "./common/guards";
import { CategoryModule } from "./category/category.module";
import { BrandModule } from "./brand/brand.module";
import { ProjectModule } from "./project/project.module";
import { ItemModule } from "./item/item.module";
import { UserModule } from "./user/user.module";
import { TransactionModule } from "./transaction/transaction.module";

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        CategoryModule,
        BrandModule,
        ProjectModule,
        ItemModule,
        UserModule,
        TransactionModule,
    ],
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
