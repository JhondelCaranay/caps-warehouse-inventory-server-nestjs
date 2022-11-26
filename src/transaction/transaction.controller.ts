import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { Public } from "src/common/decorators";
import { CreateTransactionDto, UpdateTransactionDto } from "./dto";
import { TransactionService } from "./transaction.service";

@Controller("transactions")
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Public()
    @Post()
    create(@Body() dto: CreateTransactionDto) {
        return this.transactionService.create(dto);
    }

    @Public()
    @Get()
    findAll() {
        return this.transactionService.findAll();
    }

    @Public()
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.transactionService.findOne(id);
    }

    @Public()
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
