import { PrismaService } from "./../prisma/prisma.service";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
        const categories = await this.prisma.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return categories;
    }

    async findOne(id: string) {
        const category = await this.prisma.category.findUnique({
            where: {
                id: id,
            },
        });

        if (!category) throw new NotFoundException(`Category id not found!`);

        return category;
    }

    async update(id: string, dto: UpdateCategoryDto) {
        await this.findOne(id); // check if category exists , throw a 404 error if not

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
        await this.findOne(id);

        const category = await this.prisma.category.delete({
            where: {
                id: id,
            },
        });

        return category;
    }
}
