import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { Public } from "src/common/decorators";
import { CreateProjectDto, UpdateProjectDto } from "./dto";
import { ProjectService } from "./project.service";

@Controller("projects")
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Public()
    @Post()
    create(@Body() dto: CreateProjectDto) {
        return this.projectService.create(dto);
    }

    @Public()
    @Get()
    findAll() {
        return this.projectService.findAll();
    }

    @Public()
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.projectService.findOne(id);
    }

    @Public()
    @Patch(":id")
    update(@Param("id") id: string, @Body() dto: UpdateProjectDto) {
        return this.projectService.update(id, dto);
    }

    @Public()
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.projectService.remove(id);
    }
}
