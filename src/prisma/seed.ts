/* eslint-disable @typescript-eslint/no-unused-vars */
import * as argon from "argon2";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

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
    const brand11 = await prisma.brand.create({
        data: {
            name: "Caterpillar",
        },
    });
    const brand12 = await prisma.brand.create({
        data: {
            name: "Komatsu",
        },
    });
    const brand13 = await prisma.brand.create({
        data: {
            name: "Volvo",
        },
    });

    const brand14 = await prisma.brand.create({
        data: {
            name: "Kawasaki",
        },
    });
    const brand15 = await prisma.brand.create({
        data: {
            name: "Ingersoll Rand",
        },
    });

    await prisma.item.createMany({
        data: [
            {
                name: "Bulldozer",
                description:
                    "A powerful machine used for moving earth, rocks, and debris. It is equipped with a large blade at the front for pushing material.",
                model: "BDZ1000",
                unit: "PCS",
                quantity: 40,
                price: 250000,
                brandId: brand11.id,
                categoryId: category7.id,
            },
            {
                name: "Excavator",
                description:
                    "A heavy machine used for digging and moving large amounts of earth, rocks, and debris. It is equipped with a long arm and bucket at the front for digging and scooping material.",
                model: "EXC2000",
                unit: "PCS",
                quantity: 40,
                price: 350000,
                brandId: brand12.id,
                categoryId: category7.id,
            },
            {
                name: "Backhoe",
                description:
                    "A machine used for digging and moving soil, rocks, and debris. It has a digging bucket at the front and a smaller digging bucket at the back.",
                model: "BHO3000",
                unit: "PCS",
                quantity: 40,
                price: 120000,
                brandId: brand1.id,
                categoryId: category7.id,
            },
            {
                name: "Loader",
                description:
                    "A machine used for loading material such as dirt, rocks, and debris onto trucks or into bins. It has a bucket at the front for scooping up material.",
                model: "LDR4000",
                unit: "PCS",
                quantity: 40,
                price: 150000,
                brandId: brand13.id,
                categoryId: category7.id,
            },
            {
                name: "Grader",
                description:
                    "A machine used for leveling and smoothing roads, soil, and other surfaces. It has a long blade at the front for grading material.",
                model: "GRD5000",
                unit: "PCS",
                quantity: 40,
                price: 280000,
                brandId: brand2.id,
                categoryId: category7.id,
            },
            {
                name: "Skid Steer Loader",
                description:
                    "A compact machine used for small construction jobs, landscaping, and material handling. It has a small bucket at the front and can turn within its own footprint.",
                model: "SKD6000",
                unit: "PCS",
                quantity: 40,
                price: 80000,
                brandId: brand3.id,
                categoryId: category7.id,
            },
            {
                name: "Concrete Mixer",
                description:
                    "A machine used for mixing concrete, cement, and other materials. It has a large rotating drum at the front and can be mounted on a truck or trailer.",
                model: "CMX7000",
                unit: "UNIT",
                quantity: 40,
                price: 15000,
                brandId: brand4.id,
                categoryId: category7.id,
            },
            {
                name: "Concrete Pump",
                description:
                    "A machine used for pumping concrete, cement, and other materials through a hose to the desired location. It is often mounted on a truck or trailer.",
                model: "CPM8000",
                unit: "UNIT",
                quantity: 40,
                price: 250000,
                brandId: brand5.id,
                categoryId: category7.id,
            },
            {
                name: "Concrete Vibrator",
                description:
                    "A tool used for consolidating concrete and removing air pockets. It is typically a handheld device that vibrates the concrete.",
                model: "CVB9000",
                unit: "PCS",
                quantity: 40,
                price: 1500,
                brandId: brand5.id,
                categoryId: category2.id,
            },
            {
                name: "Jackhammer",
                description:
                    "A tool used for breaking up concrete, asphalt, and other hard surfaces. It has a large chisel bit that hammers into the material.",
                model: "JHM1000",
                unit: "PCS",
                quantity: 40,
                price: 1200,
                brandId: brand14.id,
                categoryId: category2.id,
            },
            {
                name: "Air Compressor",
                description:
                    "A machine used for powering air tools such as nail guns, impact wrenches, and spray guns. It compresses air and stores it in a tank for later use.",
                model: "ACM2000",
                unit: "UNIT",
                quantity: 40,
                price: 800,
                brandId: brand15.id,
                categoryId: category1.id,
            },
            {
                name: "Pneumatic Drill",
                description:
                    "A drill powered by compressed air. It is often used for drilling in hard materials such as concrete and metal.",
                model: "PDR3000",
                unit: "PCS",
                quantity: 40,
                price: 500,
                brandId: brand15.id,
                categoryId: category2.id,
            },
            {
                name: "Hammer Drill",
                description: "A tool used to drill holes in concrete or masonry",
                model: "HD-100",
                unit: "PCS",
                quantity: 0,
                price: 120,
                brandId: brand5.id,
                categoryId: category2.id,
            },
            {
                name: "Circular Saw",
                description: "A tool used to make straight cuts in wood, metal or plastic",
                model: "CS-200",
                unit: "PCS",
                quantity: 40,
                price: 150,
                brandId: brand5.id,
                categoryId: category2.id,
            },
            {
                name: "Table Saw",
                description: "A tool used to make precise cuts in wood",
                model: "TS-300",
                unit: "PCS",
                quantity: 40,
                price: 500,
                brandId: brand5.id,
                categoryId: category2.id,
            },
            {
                name: "Chop Saw",
                description: "A tool used to make quick and accurate crosscuts in wood, metal or plastic",
                model: "CSW-400",
                unit: "PCS",
                quantity: 40,
                price: 250,
                brandId: brand5.id,
                categoryId: category2.id,
            },
            {
                name: "Miter Saw",
                description: "A tool used to make accurate angled cuts in wood, metal or plastic",
                model: "MS-500",
                unit: "PCS",
                quantity: 40,
                price: 350,
                brandId: brand7.id,
                categoryId: category2.id,
            },
            {
                name: "Jigsaw",
                description: "A tool used to make curved or intricate cuts in wood, metal or plastic",
                model: "JSW-600",
                unit: "PCS",
                quantity: 40,
                price: 100,
                brandId: brand9.id,
                categoryId: category2.id,
            },
            {
                name: "Reciprocating Saw",
                description: "A tool used to cut through wood, metal or plastic using a push and pull motion",
                model: "RSW-700",
                unit: "PCS",
                quantity: 40,
                price: 200,
                brandId: brand10.id,
                categoryId: category2.id,
            },
            {
                name: "Drill Press",
                description: "A tool used to make precise holes in wood, metal or plastic",
                model: "DP-800",
                unit: "PCS",
                quantity: 40,
                price: 600,
                brandId: brand12.id,
                categoryId: category2.id,
            },
            {
                name: "Band Saw",
                description: "A tool used to cut curves and irregular shapes in wood, metal or plastic",
                model: "BS-900",
                unit: "PCS",
                quantity: 40,
                price: 400,
                brandId: brand5.id,
                categoryId: category2.id,
            },
            {
                name: "Belt Sander",
                description: "A tool used to sand wood, metal or plastic surfaces",
                model: "BSN-1000",
                unit: "PCS",
                quantity: 40,
                price: 150,
                brandId: brand3.id,
                categoryId: category2.id,
            },
            {
                name: "Orbital Sander",
                description: "A power tool used to sand wood, metal, or other materials in a circular motion.",
                model: "OS-2000",
                unit: "PCS",
                quantity: 40,
                price: 150,
                brandId: brand3.id,
                categoryId: category2.id,
            },
            {
                name: "Power Trowel",
                description:
                    "A machine used to create a smooth, level concrete surface by spinning blades over the surface.",
                model: "PT-300",
                unit: "UNIT",
                quantity: 40,
                price: 2500,
                brandId: brand7.id,
                categoryId: category1.id,
            },
            {
                name: "Laser Level",
                description:
                    "An instrument that projects a laser beam to establish a straight line or level reference point.",
                model: "LL-500",
                unit: "PCS",
                quantity: 40,
                price: 120,
                brandId: brand2.id,
                categoryId: category4.id,
            },
            {
                name: "Surveying Equipment",
                description:
                    "Tools used to measure and map out land, including levels, theodolites, and total stations.",
                model: "SE-100",
                unit: "UNIT",
                quantity: 40,
                price: 5000,
                brandId: brand2.id,
                categoryId: category4.id,
            },
            {
                name: "Transit Level",
                description: "A surveying instrument used to measure horizontal and vertical angles and distances.",
                model: "TL-200",
                unit: "PCS",
                quantity: 40,
                price: 800,
                brandId: brand1.id,
                categoryId: category4.id,
            },
            {
                name: "Measuring Tape",
                description: "A flexible ruler used to measure distance or size.",
                model: "MT-50",
                unit: "PCS",
                quantity: 40,
                price: 5,
                brandId: brand7.id,
                categoryId: category3.id,
            },
            {
                name: "Chalk Line",
                description: "A tool used to create a straight line on a surface for cutting or laying out materials.",
                model: "CL-100",
                unit: "PCS",
                quantity: 40,
                price: 8,
                brandId: brand7.id,
                categoryId: category3.id,
            },
            {
                name: "Spirit Level",
                description: "A tool used to determine if a surface is level or plumb.",
                model: "SL-500",
                unit: "PCS",
                quantity: 40,
                price: 25,
                brandId: brand7.id,
                categoryId: category3.id,
            },
            {
                name: "Concrete Saw",
                description: "A power tool used to cut concrete, asphalt, or other hard materials.",
                model: "CS-3000",
                unit: "UNIT",
                quantity: 40,
                price: 3500,
                brandId: brand3.id,
                categoryId: category4.id,
            },
            {
                name: "Diamond Blade",
                description:
                    "A circular saw blade with diamond grit for cutting through hard materials like concrete, stone, and ceramic.",
                model: "DB-100",
                unit: "PCS",
                quantity: 40,
                price: 500,
                brandId: brand3.id,
                categoryId: category4.id,
            },
            {
                name: "Rebar Cutter",
                description: "A machine used for cutting reinforced steel bars in construction projects.",
                model: "RC-200",
                unit: "PCS",
                quantity: 40,
                price: 2000,
                brandId: brand3.id,
                categoryId: category1.id,
            },
            {
                name: "Rebar Bender",
                description: "A machine used for bending reinforced steel bars in construction projects.",
                model: "RB-300",
                unit: "PCS",
                quantity: 40,
                price: 5000,
                brandId: brand3.id,
                categoryId: category1.id,
            },
            {
                name: "Power Screed",
                description:
                    "A tool used to smooth and level concrete surfaces by vibrating the concrete to remove air pockets.",
                model: "PS-400",
                unit: "UNIT",
                quantity: 40,
                price: 8000,
                brandId: brand3.id,
                categoryId: category2.id,
            },
            {
                name: "Power Float",
                description:
                    "A machine used to finish concrete surfaces by smoothing and troweling the surface to a flat finish.",
                model: "PF-500",
                unit: "UNIT",
                quantity: 40,
                price: 10000,
                brandId: brand5.id,
                categoryId: category2.id,
            },
            {
                name: "Brick Trowel",
                description:
                    "A tool with a flat, pointed blade used for spreading and shaping mortar when laying bricks.",
                model: "BT-100",
                unit: "PCS",
                quantity: 40,
                price: 100,
                brandId: brand5.id,
                categoryId: category3.id,
            },
            {
                name: "Pointing Trowel",
                description: "A small, pointed trowel used for applying mortar to small areas.",
                model: "PT100",
                unit: "PCS",
                quantity: 40,
                price: 12.99,
                brandId: brand5.id,
                categoryId: category3.id,
            },
            {
                name: "Plastering Trowel",
                description: "A trowel with a flat, rectangular blade used for applying and smoothing plaster.",
                model: "PL200",
                unit: "PCS",
                quantity: 40,
                price: 19.99,
                brandId: brand7.id,
                categoryId: category3.id,
            },
            {
                name: "Drywall Trowel",
                description: "A trowel with a curved blade used for applying and smoothing drywall mud.",
                model: "DT300",
                unit: "PCS",
                quantity: 40,
                price: 24.99,
                brandId: brand5.id,
                categoryId: category3.id,
            },
            {
                name: "Drywall Hammer",
                description:
                    "A hammer with a rounded head used for tapping drywall nails slightly below the surface of the drywall.",
                model: "DH400",
                unit: "PCS",
                quantity: 40,
                price: 16.99,
                brandId: brand3.id,
                categoryId: category3.id,
            },
            {
                name: "Drywall Saw",
                description: "A saw with a pointed blade used for cutting drywall.",
                model: "DS500",
                unit: "PCS",
                quantity: 40,
                price: 10.99,
                brandId: brand7.id,
                categoryId: category3.id,
            },
            {
                name: "Caulking Gun",
                description: "A tool used for applying caulking to joints or cracks.",
                model: "CG600",
                unit: "PCS",
                quantity: 40,
                price: 8.99,
                brandId: brand5.id,
                categoryId: category3.id,
            },
            {
                name: "Paint Sprayer",
                description: "A tool used for spraying paint onto surfaces.",
                model: "PS700",
                unit: "UNIT",
                quantity: 40,
                price: 249.99,
                brandId: brand5.id,
                categoryId: category3.id,
            },
            {
                name: "Pressure Washer",
                description: "A machine that uses high-pressure water spray to remove dirt and grime from surfaces.",
                model: "PW800",
                unit: "UNIT",
                quantity: 40,
                price: 699.99,
                brandId: brand1.id,
                categoryId: category7.id,
            },
            {
                name: "Safety Harness",
                description: "A harness worn to prevent falls when working at heights.",
                model: "SH900",
                unit: "PCS",
                quantity: 40,
                price: 49.99,
                brandId: brand1.id,
                categoryId: category5.id,
            },
            {
                name: "Hard Hat",
                description: "A helmet worn to protect the head from falling objects or other hazards.",
                model: "HH1000",
                unit: "PCS",
                quantity: 40,
                price: 14.99,
                brandId: brand1.id,
                categoryId: category5.id,
            },
            {
                name: "Welding Machine",
                description: "A heavy-duty welding machine capable of handling large welding jobs.",
                model: "WM-5000",
                unit: "PCS",
                quantity: 40,
                price: 150000,
                brandId: brand1.id,
                categoryId: category1.id,
            },
            {
                name: "Safety glasses",
                description:
                    "Protective glasses with impact-resistant lenses to protect the eyes during welding and other hazardous activities.",
                model: "",
                unit: "PCS",
                quantity: 40,
                price: 500,
                brandId: brand1.id,
                categoryId: category5.id,
            },
            {
                name: "Steel-toed boots",
                description:
                    "Heavy-duty boots with steel toes to protect the feet from falling objects and other hazards.",
                model: "",
                unit: "PCS",
                quantity: 40,
                price: 1000,
                brandId: brand1.id,
                categoryId: category5.id,
            },
            {
                name: "Gloves",
                description: "Heavy-duty gloves designed to protect the hands from cuts, abrasions, and other hazards.",
                model: "G-500",
                unit: "UNIT",
                quantity: 40,
                price: 100,
                brandId: brand1.id,
                categoryId: category5.id,
            },
            {
                name: "Caution: Wet Floor",
                description: "A yellow sign with black letters warning of a wet floor.",
                model: "",
                unit: "PCS",
                quantity: 40,
                price: 500,
                brandId: brand9.id,
                categoryId: category6.id,
            },
            {
                name: "No Smoking",
                description: "A red and white sign with black letters indicating that smoking is prohibited.",
                model: "",
                unit: "PCS",
                quantity: 40,
                price: 200,
                brandId: brand9.id,
                categoryId: category6.id,
            },
            {
                name: "Emergency Exit",
                description: "A green and white sign with a running man indicating the location of the emergency exit.",
                model: "",
                unit: "PCS",
                quantity: 40,
                price: 300,
                brandId: brand9.id,
                categoryId: category6.id,
            },
            {
                name: "Fire Extinguisher",
                description:
                    "A red and white sign with an image of a fire extinguisher indicating the location of the nearest fire extinguisher.",
                model: "",
                unit: "PCS",
                quantity: 40,
                price: 250,
                brandId: brand9.id,
                categoryId: category6.id,
            },
        ],
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
