import { PrismaService } from "./../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateProjectDto, UpdateProjectDto } from "./dto";

@Injectable()
export class ProjectModel {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateProjectDto) {
        return await this.prisma.project.create({
            data: {
                name: dto.name,
                address: dto.address,
                userId: dto.userId,
            },
            include: {
                User: true,
            },
        });
    }

    async findAll() {
        return await this.prisma.project.findMany({
            include: {
                User: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async findOne(id: string) {
        return await this.prisma.project.findUnique({
            where: {
                id: id,
            },
            include: {
                User: true,
            },
        });
    }

    async findOneByName(name: string) {
        return await this.prisma.project.findFirst({
            where: {
                name: name,
            },
            include: {
                User: true,
            },
        });
    }

    async update(id: string, dto: UpdateProjectDto) {
        return await this.prisma.project.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name || undefined,
                address: dto.address || undefined,
                userId: dto.userId || undefined,
            },
            include: {
                User: true,
            },
        });
    }

    async remove(id: string) {
        await this.prisma.project.delete({
            where: {
                id: id,
            },
        });
    }
}
