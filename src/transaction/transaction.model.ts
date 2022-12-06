import { PrismaService } from "./../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateTransactionDto, UpdateTransactionDto } from "./dto";

@Injectable()
export class TransactionModel {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateTransactionDto) {
        return await this.prisma.transaction.create({
            data: {
                quantity: dto.quantity,
                remarks: dto.remarks || undefined,
                status: dto.status || undefined,
                userId: dto.userId,
                itemId: dto.itemId,
                projectId: dto.projectId,
                release_slip_num: dto.release_slip_num,
                materials_issuance_num: dto.materials_issuance_num,
                gate_pass_num: dto.gate_pass_num,
                return_slip_num: dto.return_slip_num || undefined,
            },
            include: {
                Item: {
                    include: {
                        Category: true,
                        Brand: true,
                    },
                },
                Project: {
                    include: {
                        User: {
                            select: {
                                id: true,
                                createdAt: true,
                                updatedAt: true,
                                email: true,
                                status: true,
                                role: true,
                                profileId: true,
                                Profile: true,
                            },
                        },
                    },
                },
                User: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        email: true,
                        status: true,
                        role: true,
                        profileId: true,
                        Profile: true,
                    },
                },
            },
        });
    }

    async findAll() {
        return await this.prisma.transaction.findMany({
            include: {
                Item: {
                    include: {
                        Category: true,
                        Brand: true,
                    },
                },
                Project: {
                    include: {
                        User: {
                            select: {
                                id: true,
                                createdAt: true,
                                updatedAt: true,
                                email: true,
                                status: true,
                                role: true,
                                profileId: true,
                                Profile: true,
                            },
                        },
                    },
                },
                User: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        email: true,
                        status: true,
                        role: true,
                        profileId: true,
                        Profile: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async findOne(id: string) {
        return await this.prisma.transaction.findUnique({
            where: {
                id: id,
            },
            include: {
                Item: {
                    include: {
                        Category: true,
                        Brand: true,
                    },
                },
                Project: {
                    include: {
                        User: {
                            select: {
                                id: true,
                                createdAt: true,
                                updatedAt: true,
                                email: true,
                                status: true,
                                role: true,
                                profileId: true,
                                Profile: true,
                            },
                        },
                    },
                },
                User: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        email: true,
                        status: true,
                        role: true,
                        profileId: true,
                        Profile: true,
                    },
                },
            },
        });
    }

    async update(id: string, dto: UpdateTransactionDto) {
        await this.prisma.transaction.update({
            where: {
                id: id,
            },
            data: {
                quantity: dto.quantity || undefined,
                remarks: dto.remarks || undefined,
                status: dto.status || undefined,
                userId: dto.userId || undefined,
                itemId: dto.itemId || undefined,
                projectId: dto.projectId || undefined,
                return_slip_num: dto.return_slip_num || undefined,
                gate_pass_num: dto.gate_pass_num || undefined,
                materials_issuance_num: dto.materials_issuance_num || undefined,
                release_slip_num: dto.release_slip_num || undefined,
            },
            include: {
                Item: {
                    include: {
                        Category: true,
                        Brand: true,
                    },
                },
                Project: {
                    include: {
                        User: {
                            select: {
                                id: true,
                                createdAt: true,
                                updatedAt: true,
                                email: true,
                                status: true,
                                role: true,
                                profileId: true,
                                Profile: true,
                            },
                        },
                    },
                },
                User: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        email: true,
                        status: true,
                        role: true,
                        profileId: true,
                        Profile: true,
                    },
                },
            },
        });
    }
}
