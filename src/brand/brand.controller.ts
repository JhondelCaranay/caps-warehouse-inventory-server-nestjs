import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { Public } from "src/common/decorators";
import { BrandService } from "./brand.service";
import { CreateBrandDto, UpdateBrandDto } from "./dto";

@Controller("brands")
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Public()
    @Post()
    create(@Body() dto: CreateBrandDto) {
        return this.brandService.create(dto);
    }

    @Public()
    @Get()
    findAll() {
        return this.brandService.findAll();
    }

    @Public()
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.brandService.findOne(id);
    }

    @Public()
    @Patch(":id")
    update(@Param("id") id: string, @Body() dto: UpdateBrandDto) {
        return this.brandService.update(id, dto);
    }

    @Public()
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.brandService.remove(id);
    }
}
