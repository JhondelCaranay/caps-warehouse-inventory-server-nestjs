/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, TRANSACTION_STATUS } from "@prisma/client";
import * as argon from "argon2";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    const hash = await argon.hash("Dev123");

    const super_admin = await prisma.user.upsert({
        where: { email: "dev1@gmail.com" },
        update: {},
        create: {
            email: "dev1@gmail.com",
            hash: hash,
            role: "SUPER_ADMIN",
            Profile: {
                create: {
                    first_name: "Jhondel",
                    last_name: "Caranay",
                },
            },
        },
    });

    const admin = await prisma.user.upsert({
        where: { email: "dev2@gmail.com" },
        update: {},
        create: {
            email: "dev2@gmail.com",
            hash: hash,
            role: "ADMIN",
            Profile: {
                create: {
                    first_name: faker.name.firstName(),
                    last_name: faker.name.lastName(),
                },
            },
        },
    });

    const controller = await prisma.user.upsert({
        where: { email: "dev3@gmail.com" },
        update: {},
        create: {
            email: "dev3@gmail.com",
            hash: hash,
            role: "WAREHOUSE_CONTROLLER",
            Profile: {
                create: {
                    first_name: faker.name.firstName(),
                    last_name: faker.name.lastName(),
                },
            },
        },
    });

    const engineer = await prisma.user.upsert({
        where: { email: "dev4@gmail.com" },
        update: {},
        create: {
            email: "dev4@gmail.com",
            hash: hash,
            role: "ENGINEER",
            Profile: {
                create: {
                    first_name: faker.name.firstName(),
                    last_name: faker.name.lastName(),
                },
            },
        },
    });
    // create Projects
    const project1 = await prisma.project.create({
        data: {
            name: "Shell Gas Station Project",
            address: "MacArthur Highway, Angeles City, Pampanga",
            userId: engineer.id,
        },
    });
    const project2 = await prisma.project.create({
        data: {
            name: "SM City Clark Project",
            address: "MacArthur Highway, Angeles City, Pampanga",
            userId: engineer.id,
        },
    });

    // create categories
    const category1 = await prisma.category.create({
        data: {
            name: "Mechanical Equipment",
        },
    });

    const category2 = await prisma.category.create({
        data: {
            name: "Power tools",
        },
    });

    const category3 = await prisma.category.create({
        data: {
            name: "Hand tools",
        },
    });

    const category4 = await prisma.category.create({
        data: {
            name: "Instrument",
        },
    });

    const category5 = await prisma.category.create({
        data: {
            name: "Safety Equipment",
        },
    });
    const category6 = await prisma.category.create({
        data: {
            name: "Signages",
        },
    });
    const category7 = await prisma.category.create({
        data: {
            name: "Heavy Equipment",
        },
    });
    const category8 = await prisma.category.create({
        data: {
            name: "Others",
        },
    });

    // create brands
    // ["Vespa", "Denyo", "Robin", "Kobota", "Mitsubishi", "Ford", "Commins", "Aramitsu"];

    const brand1 = await prisma.brand.create({
        data: {
            name: "Vespa",
        },
    });

    const brand2 = await prisma.brand.create({
        data: {
            name: "Denyo",
        },
    });

    const brand3 = await prisma.brand.create({
        data: {
            name: "Robin",
        },
    });

    const brand4 = await prisma.brand.create({
        data: {
            name: "Kobota",
        },
    });

    const brand5 = await prisma.brand.create({
        data: {
            name: "Mitsubishi",
        },
    });

    const brand6 = await prisma.brand.create({
        data: {
            name: "Ford",
        },
    });

    const brand7 = await prisma.brand.create({
        data: {
            name: "Commins",
        },
    });

    const brand8 = await prisma.brand.create({
        data: {
            name: "Aramitsu",
        },
    });

    const brand9 = await prisma.brand.create({
        data: {
            name: "Hilti",
        },
    });

    const brand10 = await prisma.brand.create({
        data: {
            name: "Bosch",
        },
    });

    // create items
    const item1 = await prisma.item.create({
        data: {
            name: "Welding Machine",
            description: "Welding Machine",
            model: "model",
            unit: "UNIT",
            quantity: 1,
            price: 100000,
            brandId: brand1.id,
            categoryId: category7.id,
        },
    });

    const item2 = await prisma.item.create({
        data: {
            name: "Air Compressor",
            description: "Air Compressor",
            model: "model",
            unit: "UNIT",
            quantity: 1,
            price: 100000,
            brandId: brand2.id,
            categoryId: category7.id,
        },
    });

    const item3 = await prisma.item.create({
        data: {
            name: "Engine for Mixer",
            description: "Engine for Mixer",
            model: "model",
            unit: "UNIT",
            quantity: 1,
            price: 100000,
            brandId: brand3.id,
            categoryId: category7.id,
        },
    });

    // create transactions make 15 random transactions
    const transaction1 = await prisma.transaction.create({
        data: {
            quantity: 6,
            status: TRANSACTION_STATUS.WAITING,
            remarks: "remarks",
            senderId: controller.id,
            receiverId: engineer.id,
            projectId: project1.id,
            itemId: item1.id,
        },
    });

    const transaction2 = await prisma.transaction.create({
        data: {
            quantity: 6,
            status: TRANSACTION_STATUS.ON_PROCESS,
            remarks: "remarks",
            senderId: controller.id,
            receiverId: engineer.id,
            projectId: project1.id,
            itemId: item2.id,
            release_slip_num: "#123456",
            materials_issuance_num: "#123456",
            gate_pass_num: "#123456",
        },
    });

    const transaction3 = await prisma.transaction.create({
        data: {
            quantity: 6,
            status: TRANSACTION_STATUS.ON_DELIVERY,
            remarks: "remarks",
            senderId: controller.id,
            receiverId: engineer.id,
            projectId: project1.id,
            itemId: item3.id,
            release_slip_num: "#123456",
            materials_issuance_num: "#123456",
            gate_pass_num: "#123456",
        },
    });

    const transaction4 = await prisma.transaction.create({
        data: {
            quantity: 6,
            status: TRANSACTION_STATUS.CONFIRMED_RECEIVED,
            remarks: "remarks",
            senderId: controller.id,
            receiverId: engineer.id,
            projectId: project1.id,
            itemId: item1.id,
            release_slip_num: "#123456",
            materials_issuance_num: "#123456",
            gate_pass_num: "#123456",
        },
    });

    const transaction5 = await prisma.transaction.create({
        data: {
            quantity: 6,
            status: TRANSACTION_STATUS.ON_RETURN,
            remarks: "remarks",
            senderId: controller.id,
            receiverId: engineer.id,
            projectId: project2.id,
            itemId: item3.id,
            release_slip_num: "#123456",
            materials_issuance_num: "#123456",
            gate_pass_num: "#123456",
            return_slip_num: "#123456",
        },
    });

    const transaction6 = await prisma.transaction.create({
        data: {
            quantity: 6,
            status: TRANSACTION_STATUS.CONFIRMED_RETURNED,
            remarks: "remarks",
            senderId: controller.id,
            receiverId: engineer.id,
            projectId: project2.id,
            itemId: item2.id,
            release_slip_num: "#123456",
            materials_issuance_num: "#123456",
            gate_pass_num: "#123456",
            return_slip_num: "#123456",
        },
    });

    const transaction7 = await prisma.transaction.create({
        data: {
            quantity: 6,
            status: TRANSACTION_STATUS.ON_DELIVERY,
            remarks: "remarks",
            senderId: controller.id,
            receiverId: engineer.id,
            projectId: project2.id,
            itemId: item1.id,
            release_slip_num: "#123456",
            materials_issuance_num: "#123456",
            gate_pass_num: "#123456",
        },
    });

    const transaction8 = await prisma.transaction.create({
        data: {
            quantity: 6,
            status: TRANSACTION_STATUS.WAITING,
            remarks: "remarks",
            senderId: controller.id,
            receiverId: engineer.id,
            projectId: project2.id,
            itemId: item1.id,
        },
    });

    const transaction9 = await prisma.transaction.create({
        data: {
            quantity: 4,
            status: TRANSACTION_STATUS.ON_RETURN,
            remarks: "remarks",
            senderId: controller.id,
            receiverId: engineer.id,
            projectId: project2.id,
            itemId: item2.id,
            release_slip_num: "#123456",
            materials_issuance_num: "#123456",
            gate_pass_num: "#123456",
            return_slip_num: "#123456",
        },
    });

    const transaction10 = await prisma.transaction.create({
        data: {
            quantity: 4,
            status: TRANSACTION_STATUS.ON_DELIVERY,
            remarks: "remarks",
            senderId: controller.id,
            receiverId: engineer.id,
            projectId: project2.id,
            itemId: item3.id,
            release_slip_num: "#123456",
            materials_issuance_num: "#123456",
            gate_pass_num: "#123456",
        },
    });

    const transaction11 = await prisma.transaction.create({
        data: {
            quantity: 4,
            status: TRANSACTION_STATUS.CONFIRMED_RECEIVED,
            remarks: "remarks",
            senderId: controller.id,
            receiverId: engineer.id,
            projectId: project2.id,
            itemId: item1.id,
            release_slip_num: "#123456",
            materials_issuance_num: "#123456",
            gate_pass_num: "#123456",
            return_slip_num: "#123456",
        },
    });

    console.log("Seed data created successfully");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
