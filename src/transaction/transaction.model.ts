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
                senderId: dto.senderId,
                receiverId: dto.receiverId,
                itemId: dto.itemId,
                projectId: dto.projectId,
                release_slip_num: dto.release_slip_num || undefined,
                materials_issuance_num: dto.materials_issuance_num || undefined,
                gate_pass_num: dto.gate_pass_num || undefined,
                return_slip_num: dto.return_slip_num || undefined,
            },
            include: {
                Item: {
                    include: {
                        Category: true,
                        Brand: true,
                    },
                },
                Project: true,
                Sender: {
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
                Receiver: {
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
                Project: true,
                Sender: {
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
                Receiver: {
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
                Project: true,
                Sender: {
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
                Receiver: {
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
                senderId: dto.senderId || undefined,
                receiverId: dto.receiverId || undefined,
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
                Project: true,
                Sender: {
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
                Receiver: {
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
