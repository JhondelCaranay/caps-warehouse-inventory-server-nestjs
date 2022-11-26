import { ProjectModule } from "./../project/project.module";
import { UserModule } from "./../user/user.module";
import { ItemModule } from "./../item/item.module";
import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";

@Module({
    controllers: [TransactionController],
    providers: [TransactionService],
    imports: [ItemModule, UserModule, ProjectModule],
})
export class TransactionModule {}
