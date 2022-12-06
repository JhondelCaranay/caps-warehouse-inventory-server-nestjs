import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ROLE } from "@prisma/client";
import { Roles } from "src/common/decorators";
import { BrandService } from "./brand.service";
import { CreateBrandDto, UpdateBrandDto } from "./dto";

@Controller("brands")
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER)
    @Post()
    create(@Body() dto: CreateBrandDto) {
        return this.brandService.create(dto);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get()
    findAll() {
        return this.brandService.findAll();
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.brandService.findOne(id);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER)
    @Patch(":id")
    update(@Param("id") id: string, @Body() dto: UpdateBrandDto) {
        return this.brandService.update(id, dto);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.brandService.remove(id);
    }
}
