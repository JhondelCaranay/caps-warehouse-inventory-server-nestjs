import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { Public } from "src/common/decorators";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Public()
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Public()
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.findOne(id);
    }

    @Public()
    @Patch(":id")
    update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
        return this.userService.update(id, dto);
    }

    // @Public()
    // @Delete(":id")
    // remove(@Param("id") id: string) {
    //     return this.userService.remove(id);
    // }
}
