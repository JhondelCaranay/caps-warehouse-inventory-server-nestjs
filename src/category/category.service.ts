import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";
import { CategoryModel } from "./category.model";

@Injectable()
export class CategoryService {
    constructor(private categoryModel: CategoryModel) {}

    async create(dto: CreateCategoryDto) {
        const duplicate = await this.categoryModel.findOneByName(dto.name);
        if (duplicate) throw new BadRequestException(`Category name already exists!`);

        const newCategory = await this.categoryModel.create(dto);
        return newCategory;
    }

    async findAll() {
        const categories = await this.categoryModel.findAll();
        return categories;
    }

    async findOne(id: string) {
        // check if category exists, throw a 404 error if not found
        const category = await this.categoryModel.findOne(id);
        if (!category) throw new NotFoundException(`Category id not found!`);

        return category;
    }

    async update(id: string, dto: UpdateCategoryDto) {
        // check if category exists, throw a 404 error if not found
        const isCategoryExists = await this.categoryModel.findOne(id);
        if (!isCategoryExists) throw new NotFoundException(`Category id not found!`);

        const category = await this.categoryModel.update(id, dto);
        return category;
    }

    async remove(id: string) {
        // check if category exists, throw a 404 error if not found
        const isCategoryExists = await this.categoryModel.findOne(id);
        if (!isCategoryExists) throw new NotFoundException(`Category id not found!`);

        const category = await this.categoryModel.remove(id);
        return category;
    }
}
