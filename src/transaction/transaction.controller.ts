import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { ROLE } from "@prisma/client";
import { Public, Roles, GetCurrentUserId } from "src/common/decorators";
import { CreateTransactionDto, UpdateTransactionDto } from "./dto";
import { TransactionService } from "./transaction.service";

@Controller("transactions")
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Post()
    create(@Body() dto: CreateTransactionDto) {
        return this.transactionService.create(dto);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get()
    findAll() {
        return this.transactionService.findAll();
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get("my-transaction")
    findAllMyTransaction(@GetCurrentUserId() userId: string) {
        return this.transactionService.findAllMyTransaction(userId);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.transactionService.findOne(id);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Patch(":id")
    update(@Param("id") id: string, @Body() dto: UpdateTransactionDto) {
        return this.transactionService.update(id, dto);
    }

    // @Public()
    // @Delete(":id")
    // remove(@Param("id") id: string) {
    //     return this.transactionService.remove(id);
    // }
}
