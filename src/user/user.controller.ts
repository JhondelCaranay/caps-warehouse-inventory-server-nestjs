import { Controller, Get, Post, Body, Patch, Param } from "@nestjs/common";
import { ROLE } from "@prisma/client";
import { GetCurrentUserId, Roles } from "src/common/decorators";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN)
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get("me")
    getMyProfile(@GetCurrentUserId() userId: string) {
        return this.userService.getMyProfile(userId);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.findOne(id);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
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
