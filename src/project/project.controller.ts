import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ROLE } from "@prisma/client";
import { Roles, GetCurrentUserId } from "src/common/decorators";
import { CreateProjectDto, UpdateProjectDto } from "./dto";
import { ProjectService } from "./project.service";

@Controller("projects")
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER)
    @Post()
    create(@Body() dto: CreateProjectDto) {
        return this.projectService.create(dto);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get()
    findAll() {
        return this.projectService.findAll();
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get("my-projects")
    findAllMyProjects(@GetCurrentUserId() userId: string) {
        return this.projectService.findAllMyProjects(userId);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get("engineer/:id")
    findAllProjectsByEngineerId(@Param("id") engineerId: string) {
        return this.projectService.findAllProjectsByEngineerId(engineerId);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER, ROLE.ENGINEER)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.projectService.findOne(id);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN, ROLE.WAREHOUSE_CONTROLLER)
    @Patch(":id")
    update(@Param("id") id: string, @Body() dto: UpdateProjectDto) {
        return this.projectService.update(id, dto);
    }

    @Roles(ROLE.SUPER_ADMIN, ROLE.ADMIN)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.projectService.remove(id);
    }
}
