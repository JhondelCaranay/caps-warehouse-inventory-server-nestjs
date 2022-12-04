import { PrismaService } from "./../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateBrandDto, UpdateBrandDto } from "./dto";

@Injectable()
export class BrandModel {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateBrandDto) {
        return await this.prisma.brand.create({
            data: {
                name: dto.name,
            },
        });
    }

    async findAll() {
        return await this.prisma.brand.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async findOne(id: string) {
        return await this.prisma.brand.findUnique({
            where: {
                id: id,
            },
        });
    }

    async findOneByName(name: string) {
        return await this.prisma.brand.findUnique({
            where: {
                id: name,
            },
        });
    }

    async update(id: string, dto: UpdateBrandDto) {
        return await this.prisma.brand.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name || undefined,
            },
        });
    }

    async remove(id: string) {
        return await this.prisma.brand.delete({
            where: {
                id: id,
            },
        });
    }
}
