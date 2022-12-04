import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBrandDto, UpdateBrandDto } from "./dto";
import { BrandModel } from "./brand.model";

@Injectable()
export class BrandService {
    constructor(private brandModel: BrandModel) {}

    async create(dto: CreateBrandDto) {
        // check if brand exists
        const duplicate = await this.brandModel.findOneByName(dto.name);
        if (duplicate) throw new BadRequestException(`Brand name already exists!`);

        // create new brand
        const newBrand = await this.brandModel.create(dto);
        return newBrand;
    }

    async findAll() {
        const brands = await this.brandModel.findAll();
        return brands;
    }

    async findOne(id: string) {
        // check if brand exists, throw a 404 error if not found
        const brand = await this.brandModel.findOne(id);
        if (!brand) throw new NotFoundException(`Brand id not found!`);

        return brand;
    }

    async update(id: string, dto: UpdateBrandDto) {
        // check if brand exists, throw a 404 error if not found
        const isBrandExists = await this.brandModel.findOne(id);
        if (!isBrandExists) throw new NotFoundException(`Brand id not found!`);

        const brand = await this.brandModel.update(id, dto);
        return brand;
    }

    async remove(id: string) {
        // check if brand exists, throw a 404 error if not found
        const isBrandExists = await this.brandModel.findOne(id);
        if (!isBrandExists) throw new NotFoundException(`Brand id not found!`);

        const brand = await this.brandModel.remove(id);
        return brand;
    }
}
