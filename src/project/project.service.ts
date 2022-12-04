import { UserModel } from "./../user/user.model";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProjectDto, UpdateProjectDto } from "./dto";
import { ProjectModel } from "./project.model";

@Injectable()
export class ProjectService {
    constructor(private projectModel: ProjectModel, private userModel: UserModel) {}

    async create(dto: CreateProjectDto) {
        // check for duplicate project
        const duplicate = await this.projectModel.findOneByName(dto.name);
        if (duplicate) throw new BadRequestException(`Project name already exists!`);

        // check if user exists, throw a 404 error if not found
        const isUserExists = await this.userModel.findOne(dto.userId);
        if (!isUserExists) throw new NotFoundException(`User id not found!`);

        const newProject = await this.projectModel.create(dto);
        return newProject;
    }

    async findAll() {
        const projects = await this.projectModel.findAll();
        return projects;
    }

    async findOne(id: string) {
        // check if project exists, throw a 404 error if not found
        const project = await this.projectModel.findOne(id);
        if (!project) throw new NotFoundException(`Project id not found!`);

        return project;
    }

    async update(id: string, dto: UpdateProjectDto) {
        // check if project exists, throw a 404 error if not found
        const isProjectExist = await this.projectModel.findOne(id);
        if (!isProjectExist) throw new NotFoundException(`Project id not found!`);

        // check if user exists, throw a 404 error if not found
        const isUserExists = await this.userModel.findOne(dto.userId);
        if (!isUserExists) throw new NotFoundException(`User id not found!`);

        const project = await this.projectModel.update(id, dto);
        return project;
    }

    async remove(id: string) {
        // check if project exists, throw a 404 error if not found
        const isProjectExist = await this.projectModel.findOne(id);
        if (!isProjectExist) throw new NotFoundException(`Project id not found!`);

        const project = await this.projectModel.remove(id);
        return project;
    }
}
