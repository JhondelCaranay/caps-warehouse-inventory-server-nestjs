import { ProjectService } from "./../project/project.service";
import { ItemService } from "./../item/item.service";
import { UserService } from "./../user/user.service";
import { PrismaService } from "./../prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTransactionDto, UpdateTransactionDto } from "./dto";

@Injectable()
export class TransactionService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private itemService: ItemService,
        private projectService: ProjectService,
    ) {}

    async create(dto: CreateTransactionDto) {
        //check if item exists
        await this.itemService.findOne(dto.itemId); // throw a 404 error if not found

        //check if project exists
        await this.projectService.findOne(dto.projectId); // throw a 404 error if not found

        //check if user exists
        await this.userService.findOne(dto.userId); // throw a 404 error if not found

        const transaction = await this.prisma.transaction.create({
            data: {
                quantity: dto.quantity,
                remarks: dto.remarks || undefined,
                status: dto.status || undefined,
                userId: dto.userId,
                itemId: dto.itemId,
                projectId: dto.projectId,
            },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                quantity: true,
                remarks: true,
                status: true,
                Item: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        model: true,
                        unit: true,
                        quantity: true,
                        price: true,
                        pictureUrl: true,
                        Category: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        Brand: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                Project: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                    },
                },
                User: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        status: true,
                        Profile: {
                            select: {
                                first_name: true,
                                last_name: true,
                                position: true,
                                address: true,
                                contact: true,
                                avatarUrl: true,
                            },
                        },
                    },
                },
            },
        });

        return transaction;
    }

    async findAll() {
        // order by createdAt DESC
        const transactions = await this.prisma.transaction.findMany({
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                quantity: true,
                remarks: true,
                status: true,
                Item: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        model: true,
                        unit: true,
                        quantity: true,
                        price: true,
                        pictureUrl: true,
                        Category: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        Brand: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                Project: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                    },
                },
                User: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        status: true,
                        Profile: {
                            select: {
                                first_name: true,
                                last_name: true,
                                position: true,
                                address: true,
                                contact: true,
                                avatarUrl: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return transactions;
    }

    async findOne(id: string) {
        // check if transaction exists , throw a 404 error if not found
        const transaction = await this.prisma.transaction.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                quantity: true,
                remarks: true,
                status: true,
                Item: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        model: true,
                        unit: true,
                        quantity: true,
                        price: true,
                        pictureUrl: true,
                        Category: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        Brand: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                Project: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                    },
                },
                User: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        status: true,
                        Profile: {
                            select: {
                                first_name: true,
                                last_name: true,
                                position: true,
                                address: true,
                                contact: true,
                                avatarUrl: true,
                            },
                        },
                    },
                },
            },
        });

        if (!transaction) throw new NotFoundException(`Transaction id not found!`);

        return transaction;
    }

    async update(id: string, dto: UpdateTransactionDto) {
        // check if transaction exists , throw a 404 error if not found
        await this.findOne(id);

        //check if item exists
        if (dto.itemId) await this.itemService.findOne(dto.itemId); // throw a 404 error if not found

        //check if project exists
        if (dto.projectId) await this.projectService.findOne(dto.projectId); // throw a 404 error if not found

        //check if user exists
        if (dto.userId) await this.userService.findOne(dto.userId); // throw a 404 error if not found

        const transaction = await this.prisma.transaction.update({
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
            },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                quantity: true,
                remarks: true,
                status: true,
                Item: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        model: true,
                        unit: true,
                        quantity: true,
                        price: true,
                        pictureUrl: true,
                        Category: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        Brand: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                Project: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                    },
                },
                User: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        status: true,
                        Profile: {
                            select: {
                                first_name: true,
                                last_name: true,
                                position: true,
                                address: true,
                                contact: true,
                                avatarUrl: true,
                            },
                        },
                    },
                },
            },
        });

        return transaction;
    }

    // async remove(id: string) {
    //     return `This action removes a #${id} transaction`;
    // }
}
