import { BrandModule } from "./../brand/brand.module";
import { CategoryModule } from "./../category/category.module";

import { Module } from "@nestjs/common";
import { ItemService } from "./item.service";
import { ItemController } from "./item.controller";
import { ItemModel } from "./item.model";

@Module({
    controllers: [ItemController],
    providers: [ItemService, ItemModel],
    exports: [ItemModel],
    imports: [CategoryModule, BrandModule],
})
export class ItemModule {}
