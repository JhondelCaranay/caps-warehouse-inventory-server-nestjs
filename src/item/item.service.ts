import { CategoryService } from "./../category/category.service";
import { BrandService } from "./../brand/brand.service";
import { PrismaService } from "./../prisma/prisma.service";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateItemDto, UpdateItemDto } from "./dto";

@Injectable()
export class ItemService {
    constructor(
        private prisma: PrismaService,
        private brandService: BrandService,
        private categoryService: CategoryService,
    ) {}

    async create(dto: CreateItemDto) {
        // check duplicate , mode case insensitive
        const duplicate = await this.prisma.item.findUnique({
            where: {
                name: dto.name,
            },
        });

        if (duplicate) throw new BadRequestException(`${dto.name} already exists`);

        // check if category id is valid
        await this.categoryService.findOne(dto.categoryId); //  throw a 404 error if not found

        // check if brand id is valid
        await this.brandService.findOne(dto.brandId); // throw a 404 error if not found
        const newItem = await this.prisma.item.create({
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
        });

        return newItem;
    }

    async findAll() {
        const items = await this.prisma.item.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return items;
    }

    async findOne(id: string) {
        // check if item exists , throw a 404 error if not found
        const item = await this.prisma.item.findUnique({
            where: {
                id: id,
            },
        });

        if (!item) throw new NotFoundException(`Item id not found!`);

        return item;
    }

    async update(id: string, dto: UpdateItemDto) {
        console.log("🚀 ~ file: item.service.ts ~ line 73 ~ ItemService ~ update ~ dto", dto);
        await this.findOne(id); // check if item exists , throw a 404 error if not found

        // check if category id is valid
        if (dto.categoryId) await this.categoryService.findOne(dto.categoryId); //  throw a 404 error if not found

        // check if brand id is
        if (dto.brandId) await this.brandService.findOne(dto.brandId); // throw a 404 error if not found

        const item = await this.prisma.item.update({
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
                // Category: {
                //     connect: {
                //         id: dto.categoryId || findItem.categoryId,
                //     },
                // },
                // Brand: {
                //     connect: {
                //         id: dto.brandId || findItem.brandId,
                //     },
                // },
            },
        });

        return item;
    }

    async remove(id: string) {
        await this.findOne(id); // check if item exists , throw a 404 error if not found

        const item = await this.prisma.item.delete({
            where: {
                id: id,
            },
        });

        return item;
    }
}
