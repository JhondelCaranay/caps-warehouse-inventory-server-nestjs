import { PrismaService } from "./../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateItemDto, UpdateItemDto } from "./dto";

@Injectable()
export class ItemModel {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateItemDto) {
        return await this.prisma.item.create({
            data: {
                name: dto.name,
                description: dto.description || undefined,
                model: dto.model,
                unit: dto.unit,
                quantity: dto.quantity,
                price: dto.price,
                pictureUrl: dto.pictureUrl || undefined,
                categoryId: dto.categoryId,
                brandId: dto.brandId,
            },
            include: {
                Category: true,
                Brand: true,
            },
        });
    }

    async findAll() {
        return await this.prisma.item.findMany({
            include: {
                Category: true,
                Brand: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async findOne(id: string) {
        return await this.prisma.item.findUnique({
            where: {
                id: id,
            },
        });
    }

    async findOneByName(name: string) {
        return await this.prisma.item.findUnique({
            where: {
                name: name,
            },
            include: {
                Category: true,
                Brand: true,
            },
        });
    }

    async update(id: string, dto: UpdateItemDto) {
        return await this.prisma.item.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name || undefined,
                description: dto.description || undefined,
                model: dto.model || undefined,
                unit: dto.unit || undefined,
                quantity: dto.quantity || undefined,
                price: dto.price || undefined,
                pictureUrl: dto.pictureUrl || undefined,
                categoryId: dto.categoryId || undefined,
                brandId: dto.brandId || undefined,
            },
            include: {
                Category: true,
                Brand: true,
            },
        });
    }

    async remove(id: string) {
        return await this.prisma.item.delete({
            where: {
                id: id,
            },
        });
    }
}
