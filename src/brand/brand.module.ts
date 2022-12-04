import { Module } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { BrandController } from "./brand.controller";
import { BrandModel } from "./brand.model";

@Module({
    controllers: [BrandController],
    providers: [BrandService, BrandModel],
    exports: [BrandService, BrandModel],
})
export class BrandModule {}
