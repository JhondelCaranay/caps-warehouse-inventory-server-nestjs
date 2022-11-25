import { PrismaService } from "./../prisma/prisma.service";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
        if (duplicate) throw new BadRequestException(`${dto.name} already exists`);

        // create new brand
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
        // check if category exists, throw a 404 error if not found
        const brand = await this.prisma.brand.findUnique({
            where: {
                id: id,
            },
        });
        if (!brand) throw new NotFoundException(`Brand id not found!`);

        return brand;
    }

    async update(id: string, dto: UpdateBrandDto) {
        await this.findOne(id); // check if category exists , throw a 404 error if not found

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
        await this.findOne(id); // check if category exists , throw a 404 error if not founds

        const brand = await this.prisma.brand.delete({
            where: {
                id: id,
            },
        });

        return brand;
    }
}
