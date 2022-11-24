import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { Public } from "src/common/decorators";
import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

@Controller("category")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Public()
    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoryService.create(dto);
    }

    @Public()
    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @Public()
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.categoryService.findOne(id);
    }

    @Public()
    @Patch(":id")
    update(@Param("id") id: string, @Body() dto: UpdateCategoryDto) {
        return this.categoryService.update(id, dto);
    }

    @Public()
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.categoryService.remove(id);
    }
}
