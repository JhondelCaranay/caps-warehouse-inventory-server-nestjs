import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { Public } from "src/common/decorators";
import { CreateItemDto, UpdateItemDto } from "./dto";
import { ItemService } from "./item.service";

@Controller("items")
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Public()
    @Post()
    create(@Body() dto: CreateItemDto) {
        return this.itemService.create(dto);
    }

    @Public()
    @Get()
    findAll() {
        return this.itemService.findAll();
    }

    @Public()
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.itemService.findOne(id);
    }

    @Public()
    @Patch(":id")
    update(@Param("id") id: string, @Body() dto: UpdateItemDto) {
        return this.itemService.update(id, dto);
    }

    @Public()
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.itemService.remove(id);
    }
}
