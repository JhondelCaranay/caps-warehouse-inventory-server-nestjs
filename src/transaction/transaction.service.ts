import { UserModel } from "./../user/user.model";
import { ProjectModel } from "./../project/project.model";
import { ItemModel } from "./../item/item.model";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTransactionDto, UpdateTransactionDto, UpdateTransactionStatusDto } from "./dto";
import { TransactionModel } from "./transaction.model";
import { PrismaService } from "src/prisma/prisma.service";
import { ITEM_STATUS, TRANSACTION_STATUS } from "@prisma/client";
import { format } from "date-fns";
@Injectable()
export class TransactionService {
    constructor(
        private transactionModel: TransactionModel,
        private itemModel: ItemModel,
        private projectModel: ProjectModel,
        private userModel: UserModel,
        private prisma: PrismaService,
    ) {}

    async create(dto: CreateTransactionDto) {
        // check if item exists, throw a 404 error if not found
        const isItemExist = await this.itemModel.findOne(dto.itemId);
        if (!isItemExist) throw new NotFoundException(`Item id not found!`);

        // check if project exists, throw a 404 error if not found
        const isProjectExist = await this.projectModel.findOne(dto.projectId);
        if (!isProjectExist) throw new NotFoundException(`Project id not found!`);

        // check if user exists, throw a 404 error if not found
        const isUserSenderExist = dto.senderId ? await this.userModel.findOne(dto.senderId) : true;
        if (!isUserSenderExist) throw new NotFoundException(`User Sender id not found!`);
        console.log("sucess sender");
        // check if user exists, throw a 404 error if not found
        const isUserRecieverExist = await this.userModel.findOne(dto.receiverId);
        if (!isUserRecieverExist) throw new NotFoundException(`User Receiver id not found!`);

        // const totaltransaction = await this.prisma.transaction.count();

        // dto.release_slip_num = dto.release_slip_num
        //     ? format(new Date(), `'RS${totaltransaction + 1}-Q${dto.quantity}-Y'yy'M'MM'D'dd`)
        //     : null;
        // dto.materials_issuance_num = dto.materials_issuance_num
        //     ? format(new Date(), `'MI${totaltransaction + 1}-Q${dto.quantity}-Y'yy'M'MM'D'dd`)
        //     : null;
        // dto.gate_pass_num = dto.gate_pass_num
        //     ? format(new Date(), `'GP${totaltransaction + 1}-Q${dto.quantity}-Y'yy'M'MM'D'dd`)
        //     : null;

        const transaction = await this.transactionModel.create(dto);
        console.log("create : ", { transaction });

        return transaction;
    }

    async findAll() {
        // order by createdAt DESC
        const transactions = await this.transactionModel.findAll();
        return transactions;
    }

    async findAllByProjectId(projectId: string) {
        // get transaction by project id
        const transactions = await this.prisma.transaction.findMany({
            where: {
                projectId: projectId,
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
            orderBy: {
                createdAt: "desc",
            },
            take: 15,
        });
        return transactions;
    }

    async findAllByItemId(itemId: string) {
        // get transaction by item id
        const transactions = await this.prisma.transaction.findMany({
            where: {
                itemId: itemId,
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
            orderBy: {
                createdAt: "desc",
            },
            take: 15,
        });
        return transactions;
    }

    async findAllMyTransaction(userId: string) {
        // get transaction by user id
        const transactions = await this.prisma.transaction.findMany({
            where: {
                receiverId: userId,
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
            orderBy: {
                createdAt: "desc",
            },
        });
        return transactions;
    }

    async findOne(id: string) {
        // check if transaction exists , throw a 404 error if not found
        const transaction = await this.transactionModel.findOne(id);
        if (!transaction) throw new NotFoundException(`Transaction id not found!`);

        return transaction;
    }

    async update(id: string, dto: UpdateTransactionDto) {
        // check if transaction exists, throw a 404 error if not found
        const isTransactionExist = await this.transactionModel.findOne(id);
        if (!isTransactionExist) throw new NotFoundException(`Transaction id not found!`);

        // check if item exists, throw a 404 error if not found
        const isItemExist = await this.itemModel.findOne(dto.itemId);
        if (!isItemExist) throw new NotFoundException(`Item id not found!`);

        // check if project exists, throw a 404 error if not found
        const isProjectExist = await this.projectModel.findOne(dto.projectId);
        if (!isProjectExist) throw new NotFoundException(`Project id not found!`);

        // check if user exists, throw a 404 error if not found
        const isUserSenderExist = await this.userModel.findOne(dto.senderId);
        if (!isUserSenderExist) throw new NotFoundException(`User id not found!`);

        // check if user exists, throw a 404 error if not found
        const isUserRecieverExist = await this.userModel.findOne(dto.receiverId);
        if (!isUserRecieverExist) throw new NotFoundException(`User id not found!`);

        const transaction = await this.transactionModel.update(id, dto);

        return transaction;
    }

    async updateStatus(id: string, dto: UpdateTransactionStatusDto, userId: string) {
        // check if transaction exists, throw a 404 error if not found
        const transaction = await this.transactionModel.findOne(id);
        if (!transaction) throw new NotFoundException(`Transaction id not found!`);

        // find item from transaction
        const item = await this.itemModel.findOne(transaction.itemId);
        if (!item) throw new NotFoundException(`Item id not found!`);

        if (transaction.status === TRANSACTION_STATUS.WAITING) {
            const totaltransaction = await this.prisma.transaction.count();

            const release_slip_num = format(
                new Date(),
                `'RS${totaltransaction + 1}-Q${transaction.quantity}-Y'yy'M'MM'D'dd`,
            );

            const materials_issuance_num = format(
                new Date(),
                `'MI${totaltransaction + 1}-Q${transaction.quantity}-Y'yy'M'MM'D'dd`,
            );

            const gate_pass_num = format(
                new Date(),
                `'GP${totaltransaction + 1}-Q${transaction.quantity}-Y'yy'M'MM'D'dd`,
            );

            const updatedTransaction = await this.prisma.transaction.update({
                where: {
                    id: id,
                },
                data: {
                    status: dto.status || TRANSACTION_STATUS.ON_DELIVERY,
                    remarks: dto.remarks,
                    release_slip_num: release_slip_num,
                    materials_issuance_num: materials_issuance_num,
                    gate_pass_num: gate_pass_num,
                    Sender: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });

            if (transaction.quantity > item.quantity || item.quantity === 0) {
                throw new NotFoundException(`Item quantity not enough!`);
            }

            // update item quantity
            const updatedItem = await this.prisma.item.update({
                where: {
                    id: item.id,
                },
                data: {
                    quantity: item.quantity - transaction.quantity,
                    status: ITEM_STATUS.BORROWED,
                },
            });

            return updatedTransaction;
        }

        if (transaction.status === TRANSACTION_STATUS.ON_DELIVERY) {
            const updatedTransaction = await this.prisma.transaction.update({
                where: {
                    id: id,
                },
                data: {
                    status: dto.status || TRANSACTION_STATUS.CONFIRMED_RECEIVED,
                    remarks: dto.remarks,
                    // Sender: {
                    //     connect: {
                    //         id: userId,
                    //     },
                    // },
                },
            });

            return updatedTransaction;
        }

        if (transaction.status === TRANSACTION_STATUS.CONFIRMED_RECEIVED) {
            const totaltransaction = await this.prisma.transaction.count();
            const return_slip_num = format(
                new Date(),
                `'RS${totaltransaction + 1}-Q${transaction.quantity}-Y'yy'M'MM'D'dd`,
            );

            const updatedTransaction = await this.prisma.transaction.update({
                where: {
                    id: id,
                },
                data: {
                    status: dto.status || TRANSACTION_STATUS.ON_RETURN,
                    remarks: dto.remarks,
                    return_slip_num: return_slip_num,
                    // Sender: {
                    //     connect: {
                    //         id: userId,
                    //     },
                    // },
                },
            });

            return updatedTransaction;
        }

        if (transaction.status === TRANSACTION_STATUS.ON_RETURN) {
            const updatedTransaction = await this.prisma.transaction.update({
                where: {
                    id: id,
                },
                data: {
                    status: dto.status || TRANSACTION_STATUS.CONFIRMED_RETURNED,
                    remarks: dto.remarks,
                    // Sender: {
                    //     connect: {
                    //         id: userId,
                    //     },
                    // },
                },
            });

            // update item quantity
            const updatedItem = await this.prisma.item.update({
                where: {
                    id: item.id,
                },
                data: {
                    quantity: item.quantity + transaction.quantity,
                    status: ITEM_STATUS.AVAILABLE,
                },
            });
            return updatedTransaction;
        }

        return transaction;
    }

    // async remove(id: string) {
    //     return `This action removes a #${id} transaction`;
    // }
}
