import { PrismaService } from "./../prisma/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateBrandDto, UpdateBrandDto } from "./dto";

@Injectable()
export class BrandService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateBrandDto) {
        // check if brand exists
        const duplicate = await this.prisma.brand.findUnique({
            where: {
                name: dto.name,
            },
        });

        if (duplicate) {
            throw new BadRequestException(`${dto.name} already exists`);
        }

        const newBrand = await this.prisma.brand.create({
            data: {
                name: dto.name.toLocaleLowerCase(),
            },
        });

        return newBrand;
    }

    async findAll() {
        // sort by createdAt DESC
        const brands = await this.prisma.brand.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return brands;
    }

    async findOne(id: string) {
        const brand = await this.prisma.brand.findUnique({
            where: {
                id: id,
            },
        });

        if (!brand) {
            throw new BadRequestException(`Brand not found!`);
        }

        return brand;
    }

    async update(id: string, dto: UpdateBrandDto) {
        const brand = await this.prisma.brand.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name?.toLocaleLowerCase() || undefined,
            },
        });

        return brand;
    }

    async remove(id: string) {
        const brand = await this.prisma.brand.delete({
            where: {
                id: id,
            },
        });

        return brand;
    }
}
