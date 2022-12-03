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
                                email: true,
                                role: true,
                                status: true,
                                Profile: true,
                            },
                        },
                    },
                },
                User: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        status: true,
                        Profile: true,
                    },
                },
            },
        });

        return transaction;
    }

    async findAll() {
        // order by createdAt DESC
        const transactions = await this.prisma.transaction.findMany({
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
                                email: true,
                                role: true,
                                status: true,
                                Profile: true,
                            },
                        },
                    },
                },
                User: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        status: true,
                        Profile: true,
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
                                email: true,
                                role: true,
                                status: true,
                                Profile: true,
                            },
                        },
                    },
                },
                User: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        status: true,
                        Profile: true,
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
                                email: true,
                                role: true,
                                status: true,
                                Profile: true,
                            },
                        },
                    },
                },
                User: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        status: true,
                        Profile: true,
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
