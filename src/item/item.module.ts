import { CategoryModule } from "./../category/category.module";
import { BrandModule } from "./../brand/brand.module";
import { Module } from "@nestjs/common";
import { ItemService } from "./item.service";
import { ItemController } from "./item.controller";

@Module({
    controllers: [ItemController],
    providers: [ItemService],
    imports: [BrandModule, CategoryModule],
})
export class ItemModule {}
