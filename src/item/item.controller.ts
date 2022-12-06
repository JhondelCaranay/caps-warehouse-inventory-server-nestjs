import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ROLE } from "@prisma/client";
import { Roles } from "src/common/decorators";
import { CreateItemDto, UpdateItemDto } from "./dto";
import { ItemService } from "./item.service";

@Controller("items")
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER)
    @Post()
    create(@Body() dto: CreateItemDto) {
        return this.itemService.create(dto);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.USER)
    @Get()
    findAll() {
        return this.itemService.findAll();
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.itemService.findOne(id);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER, ROLE.USER)
    @Patch(":id")
    update(@Param("id") id: string, @Body() dto: UpdateItemDto) {
        return this.itemService.update(id, dto);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.itemService.remove(id);
    }
}
