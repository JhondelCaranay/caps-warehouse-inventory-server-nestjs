import { PrismaService } from "./../prisma/prisma.service";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProjectDto, UpdateProjectDto } from "./dto";

@Injectable()
export class ProjectService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateProjectDto) {
        // check for duplicate category
        const duplicate = await this.prisma.project.findFirst({
            where: {
                name: dto.name,
            },
        });

        if (duplicate) throw new BadRequestException(`${dto.name} already exists`);

        const newProject = await this.prisma.project.create({
            data: {
                name: dto.name,
                address: dto.address,
                userId: dto.userId,
            },
        });

        return newProject;
    }

    async findAll() {
        const projects = await this.prisma.project.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return projects;
    }

    async findOne(id: string) {
        // check if category exists, throw a 404 error if not found
        const project = await this.prisma.project.findUnique({
            where: {
                id: id,
            },
        });

        if (!project) {
            throw new NotFoundException(`Project id not found!`);
        }

        return project;
    }

    async update(id: string, dto: UpdateProjectDto) {
        await this.findOne(id); // check if category exists , throw a 404 error if not found

        const project = await this.prisma.project.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name || undefined,
                address: dto.address || undefined,
                userId: dto.userId || undefined,
            },
        });

        return project;
    }

    async remove(id: string) {
        await this.findOne(id); // check if category exists , throw a 404 error if not found

        const project = await this.prisma.project.delete({
            where: {
                id: id,
            },
        });

        return project;
    }
}
