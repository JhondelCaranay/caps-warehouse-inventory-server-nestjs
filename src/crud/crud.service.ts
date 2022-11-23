import { Injectable } from "@nestjs/common";
import { CreateCrudDto } from "./dto/create-crud.dto";
import { UpdateCrudDto } from "./dto/update-crud.dto";

@Injectable()
export class CrudService {
    create(createCrudDto: CreateCrudDto) {
        console.log(createCrudDto);
        return "This action adds a new crud";
    }

    findAll() {
        return `This action returns all crud`;
    }

    findOne(id: number) {
        return `This action returns a #${id} crud`;
    }

    update(id: number, updateCrudDto: UpdateCrudDto) {
        console.log(updateCrudDto);
        return `This action updates a #${id} crud`;
    }

    remove(id: number) {
        return `This action removes a #${id} crud`;
    }
}
