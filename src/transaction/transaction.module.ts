import { UserModule } from "./../user/user.module";
import { ProjectModule } from "./../project/project.module";
import { ItemModule } from "./../item/item.module";
import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";
import { TransactionModel } from "./transaction.model";

@Module({
    controllers: [TransactionController],
    providers: [TransactionService, TransactionModel],
    imports: [ItemModule, ProjectModule, UserModule],
})
export class TransactionModule {}
