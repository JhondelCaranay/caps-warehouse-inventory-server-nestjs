import { PrismaService } from "./../prisma/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateCategoryDto) {
        const duplicate = await this.prisma.category.findUnique({
            where: {
                name: dto.name.toLocaleLowerCase(),
            },
        });

        if (duplicate) {
            throw new BadRequestException(`${dto.name} already exists`);
        }

        const newCategory = await this.prisma.category.create({
            data: {
                name: dto.name.toLocaleLowerCase(),
            },
        });

        return newCategory;
    }

    async findAll() {
        const categories = await this.prisma.category.findMany();
        return categories;
    }

    async findOne(id: string) {
        const category = await this.prisma.category.findUnique({
            where: {
                id: id,
            },
        });

        if (!category) {
            throw new BadRequestException(`Category not found!`);
        }

        return category;
    }

    async update(id: string, dto: UpdateCategoryDto) {
        const category = await this.prisma.category.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name?.toLocaleLowerCase() || undefined,
            },
        });

        return category;
    }

    async remove(id: string) {
        const category = await this.prisma.category.delete({
            where: {
                id: id,
            },
        });

        return category;
    }
}
