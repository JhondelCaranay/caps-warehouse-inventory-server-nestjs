import { PrismaService } from "./../prisma/prisma.service";

import { Injectable } from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

@Injectable()
export class CategoryModel {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateCategoryDto) {
        return await this.prisma.category.create({
            data: {
                name: dto.name,
            },
        });
    }

    async findAll() {
        return await this.prisma.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async findOne(id: string) {
        return await this.prisma.category.findUnique({
            where: {
                id: id,
            },
        });
    }

    async findOneByName(name: string) {
        return await this.prisma.category.findUnique({
            where: {
                id: name,
            },
        });
    }

    async update(id: string, dto: UpdateCategoryDto) {
        return await this.prisma.category.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name || undefined,
            },
        });
    }

    async remove(id: string) {
        return await this.prisma.category.delete({
            where: {
                id: id,
            },
        });
    }
}
