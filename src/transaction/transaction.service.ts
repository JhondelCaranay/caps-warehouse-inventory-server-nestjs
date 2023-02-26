import { UserModel } from "./../user/user.model";
import { ProjectModel } from "./../project/project.model";
import { ItemModel } from "./../item/item.model";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTransactionDto, UpdateTransactionDto } from "./dto";
import { TransactionModel } from "./transaction.model";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

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
        const isUserSenderExist = await this.userModel.findOne(dto.senderId);
        if (!isUserSenderExist) throw new NotFoundException(`User Sender id not found!`);
        console.log("sucess sender");
        // check if user exists, throw a 404 error if not found
        const isUserRecieverExist = await this.userModel.findOne(dto.receiverId);
        if (!isUserRecieverExist) throw new NotFoundException(`User Receiver id not found!`);

        const transaction = await this.transactionModel.create(dto);
        return transaction;
    }

    async findAll() {
        // order by createdAt DESC
        const transactions = await this.transactionModel.findAll();
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

    // async remove(id: string) {
    //     return `This action removes a #${id} transaction`;
    // }
}
