import { BrandModel } from "./../brand/brand.model";
import { CategoryModel } from "./../category/category.model";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateItemDto, UpdateItemDto } from "./dto";
import { ItemModel } from "./item.model";

@Injectable()
export class ItemService {
    // CategoryModel, BrandModel
    constructor(private itemModel: ItemModel, private categoryModel: CategoryModel, private brandModel: BrandModel) {}

    async create(dto: CreateItemDto) {
        // check duplicate
        const duplicate = await this.itemModel.findOneByName(dto.name);
        if (duplicate) throw new BadRequestException(`Item name already exists!`);

        // check if category exists, throw a 404 error if not found
        const isCategoryExist = await this.categoryModel.findOne(dto.categoryId);
        if (!isCategoryExist) throw new NotFoundException(`Category id not found!`);

        // check if brand exists, throw a 404 error if not found
        const isBrandExist = await this.brandModel.findOne(dto.brandId);
        if (!isBrandExist) throw new NotFoundException(`Brand id not found!`);

        const newItem = await this.itemModel.create(dto);
        return newItem;
    }

    async findAll(name: string, category: string, skip: number, take: number) {
        const items = await this.itemModel.findAll(name, category, skip, take);
        return items;
    }

    async findOne(id: string) {
        // check if item exists , throw a 404 error if not found
        const item = await this.itemModel.findOne(id);
        if (!item) throw new NotFoundException(`Item id not found!`);
        return item;
    }

    async update(id: string, dto: UpdateItemDto) {
        // check if item exists, throw a 404 error if not found
        const isItemExist = await this.itemModel.findOne(id);
        if (!isItemExist) throw new NotFoundException(`Item id not found!`);

        // check if category exists, throw a 404 error if not found
        const isCategoryExist = await this.categoryModel.findOne(dto.categoryId);
        if (!isCategoryExist) throw new NotFoundException(`Category id not found!`);

        // check if brand exists, throw a 404 error if not found
        const isBrandExist = await this.brandModel.findOne(dto.brandId);
        if (!isBrandExist) throw new NotFoundException(`Brand id not found!`);

        const item = await this.itemModel.update(id, dto);
        return item;
    }

    async remove(id: string) {
        // check if item exists, throw a 404 error if not found
        const isItemExist = await this.itemModel.findOne(id);
        if (!isItemExist) throw new NotFoundException(`Item id not found!`);

        const item = await this.itemModel.remove(id);
        return item;
    }
}
