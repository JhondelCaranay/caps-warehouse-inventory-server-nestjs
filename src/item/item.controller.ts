import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
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

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get()
    findAll(
        @Query("name") name: string,
        @Query("category") category: string,
        @Query("status") status: string,
        @Query("page") skip: number,
        @Query("limit") take: number,
    ) {
        // console.log(name, typeof name);
        // console.log(category, typeof category);
        console.log("page: ", skip, typeof skip);
        console.log("limit: ", take, typeof take);
        console.log("newwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");

        return this.itemService.findAll(name, category, status, skip, take);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.itemService.findOne(id);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER, ROLE.ENGINEER)
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
