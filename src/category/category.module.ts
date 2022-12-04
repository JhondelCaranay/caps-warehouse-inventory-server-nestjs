import { CategoryModel } from "./category.model";
import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, CategoryModel],
    exports: [CategoryModel],
})
export class CategoryModule {}
