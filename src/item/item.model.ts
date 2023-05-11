import { PrismaService } from "./../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateItemDto, UpdateItemDto } from "./dto";
import { ITEM_STATUS } from "@prisma/client";

@Injectable()
export class ItemModel {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateItemDto) {
        return await this.prisma.item.create({
            data: {
                name: dto.name,
                referalId: dto.referalId,
                description: dto.description || undefined,
                model: dto.model || undefined,
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

    async findAll(name: string, category: string, status: string, skip: number, take: number) {
        return await this.prisma.item.findMany({
            take: take || undefined,
            skip: skip * take || undefined,
            where: {
                name: {
                    contains: name || undefined,
                },
                Category: {
                    name: {
                        contains: category || undefined,
                    },
                },
                status: status ? ITEM_STATUS[status.toLocaleUpperCase()] : undefined,
            },
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
        return await this.prisma.item.findFirst({
            where: {
                name: name,
            },
            include: {
                Category: true,
                Brand: true,
            },
        });
    }
    async findOneReferralId(referralId: string) {
        return await this.prisma.item.findUnique({
            where: {
                referalId: referralId,
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
