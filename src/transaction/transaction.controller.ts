import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { ROLE } from "@prisma/client";
import { Roles, GetCurrentUserId } from "src/common/decorators";
import { CreateTransactionDto, UpdateTransactionDto, UpdateTransactionStatusDto } from "./dto";
import { TransactionService } from "./transaction.service";

@Controller("transactions")
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Post()
    create(@Body() dto: CreateTransactionDto) {
        console.log(dto);
        // return { id: "9b33870f-8c4b-43f3-a3ae-58e46adda40d" };
        return this.transactionService.create(dto);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get()
    findAll() {
        return this.transactionService.findAll();
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get("project/:projectId")
    findAllByProjectId(@Param("projectId") projectId: string) {
        return this.transactionService.findAllByProjectId(projectId);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get("item/:itemId")
    findAllByItemId(@Param("itemId") itemId: string) {
        return this.transactionService.findAllByItemId(itemId);
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

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Patch("status/:id")
    updateStatus(@Param("id") id: string, @Body() dto: UpdateTransactionStatusDto, @GetCurrentUserId() userId: string) {
        console.log({ dto });

        return this.transactionService.updateStatus(id, dto, userId);
    }

    // @Public()
    // @Delete(":id")
    // remove(@Param("id") id: string) {
    //     return this.transactionService.remove(id);
    // }
}
