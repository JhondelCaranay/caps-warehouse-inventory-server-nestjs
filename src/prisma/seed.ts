/* eslint-disable @typescript-eslint/no-unused-vars */
import * as argon from "argon2";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const hash = await argon.hash("Dev123");

    const super_admin = await prisma.user.upsert({
        where: { email: "superadmin@gmail.com" },
        update: {},
        create: {
            email: "superadmin@gmail.com",
            hash: hash,
            role: "SUPER_ADMIN",
            isNeedChangePassword: false,
            Profile: {
                create: {
                    first_name: "John Joseph",
                    last_name: "Tiangco",
                    position: "Admin Officer",
                    avatarUrl:
                        "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fjohn.jfif?alt=media&token=9472a17d-1f7b-48a0-b906-a0b52c2ee617",
                },
            },
        },
    });

    const admin = await prisma.user.upsert({
        where: { email: "admin1@gmail.com" },
        update: {},
        create: {
            email: "admin1@gmail.com",
            hash: hash,
            role: "ADMIN",
            isNeedChangePassword: false,
            Profile: {
                create: {
                    first_name: "Cary",
                    last_name: "Bondoc",
                    position: "IT Consultant",
                    avatarUrl:
                        "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fc11915c53031586c2cbcf02fb32df041.png?alt=media&token=47537157-4914-4caf-a295-cf888c293c49",
                },
            },
        },
    });
    const jhondel = await prisma.user.upsert({
        where: { email: "jhondeldelconacaranay@gmail.com" },
        update: {},
        create: {
            email: "jhondeldelconacaranay@gmail.com",
            hash: hash,
            role: "ADMIN",
            isNeedChangePassword: false,
            Profile: {
                create: {
                    first_name: "Jhondel",
                    last_name: "Caranay",
                    position: "Web Developer",
                },
            },
        },
    });

    const controller = await prisma.user.upsert({
        where: { email: "controller1@gmail.com" },
        update: {},
        create: {
            email: "controller1@gmail.com",
            hash: hash,
            role: "WAREHOUSE_CONTROLLER",
            isNeedChangePassword: false,
            Profile: {
                create: {
                    first_name: "Victor",
                    last_name: "Mabazza",
                    position: "Materials Controller",
                },
            },
        },
    });

    const engineer = await prisma.user.upsert({
        where: { email: "engineer1@gmail.com" },
        update: {},
        create: {
            email: "engineer1@gmail.com",
            hash: hash,
            role: "ENGINEER",
            isNeedChangePassword: false,
            Profile: {
                create: {
                    first_name: "Jabez",
                    last_name: "Bondoc",
                    position: "Project Supervisor",
                    avatarUrl:
                        "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2F1.jfif?alt=media&token=862e7ccc-b392-4b18-b0f6-3f0a83b85607",
                },
            },
        },
    });
    // create Projects
    const project1 = await prisma.project.create({
        data: {
            name: "NTI Shell Acienda 2021",
            address: "Silang, Cavite",
            userId: engineer.id,
        },
    });
    const project2 = await prisma.project.create({
        data: {
            name: "NTI Shell Mahogany 2021",
            address: "Silang, Cavite",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fbuldozer.jpg?alt=media&token=86ba05f8-c3ae-4335-ae4e-4fd1d954ee19",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fexcavator.jpg?alt=media&token=d52b9b8a-c10b-4998-abf6-416df97bb39f",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fbackhoe.jpg?alt=media&token=32cd3562-8b7d-48a7-9d92-2e32bf2fe2d3",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Floader.jpg?alt=media&token=76d17c22-9f46-4618-814f-018a58eccc8c",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fgrader.jpg?alt=media&token=00e473e7-a56d-40d6-8087-f5b11ee1642e",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fskid.jpg?alt=media&token=50102249-0f96-4991-8c8f-dadcaca0e259",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2FTilting-drum-concrete-mixer.jpg?alt=media&token=62ad2d56-9889-4cef-887a-739ce1024172",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fconcretepump.jpg?alt=media&token=a4cc3d70-e72e-4149-9dfb-fc0725c58c1e",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fconcretevibrator.jpg?alt=media&token=f2bf60f3-4cd4-40da-9b9f-b23eb2acbb74",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Faircompppressor.jpg?alt=media&token=afc4e479-415b-41bf-bead-0d54f94809a5",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fpdrill.jpeg?alt=media&token=8629add2-ab9e-4a03-8056-7606f8ed3cbb",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fhdrill.jpeg?alt=media&token=430fd24a-76f0-4651-b84a-c6434692ccfe",
            },
            {
                name: "Circular Saw",
                description: "A tool used to make straight cuts in wood, metal or plastic",
                model: "CS-200",
                unit: "PCS",
                quantity: 40,
                price: 150,
                brandId: brand10.id,
                categoryId: category2.id,
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fcirsaw.png?alt=media&token=b72687ca-a148-4e4f-a7fa-35c632601f77",
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
                brandId: brand10.id,
                categoryId: category2.id,
            },
            {
                name: "Miter Saw",
                description: "A tool used to make accurate angled cuts in wood, metal or plastic",
                model: "MS-500",
                unit: "PCS",
                quantity: 40,
                price: 350,
                brandId: brand10.id,
                categoryId: category2.id,
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fchoppsaw.png?alt=media&token=59d1fd04-ae13-4d1e-a39e-2665bd9c6601",
            },
            {
                name: "Jigsaw",
                description: "A tool used to make curved or intricate cuts in wood, metal or plastic",
                model: "JSW-600",
                unit: "PCS",
                quantity: 40,
                price: 100,
                brandId: brand10.id,
                categoryId: category2.id,
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fjigsaw.png?alt=media&token=f4e616cb-b387-4c21-9d66-744071215411",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Frecsaw.png?alt=media&token=711bfa7f-25a7-48f3-bf02-f4ea0d0dbcf2",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fbandsaw.jfif?alt=media&token=d758fbc8-7e95-4477-a561-a7670acc8273",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fbeltsander.jfif?alt=media&token=c9b8edb9-7eea-4ff9-a615-55f7dea91181",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Forbsander.jfif?alt=media&token=c8f77236-f3fc-436c-9f4f-2dd01be02b4a",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fpowtrowel.jpeg?alt=media&token=7cf47431-3633-415a-81b3-a0eec1a879d4",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Flaserlevel.jpg?alt=media&token=437501b1-09d0-401c-9bb7-65f7ff79553d",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fsurveyequip.jpg?alt=media&token=9132a060-2912-46ef-a465-162524cfa60c",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fmeasuretape.jfif?alt=media&token=8c45e9dd-1af7-4a04-8fa7-978bfcf80777",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fchalkline.jfif?alt=media&token=21225366-0b67-4cd6-8911-3523e0a8fd23",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fspirit.jfif?alt=media&token=c3582916-faaf-4af8-a8f3-ebdaee072e33",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fconsaw.jfif?alt=media&token=a3291161-c9d8-434f-8671-09db5072d313",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fdiablade.jfif?alt=media&token=98c8432c-1f73-49f4-ad35-0e602e32a19c",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fredbar.jfif?alt=media&token=5e7c6b15-70f9-447a-a859-12ef93e966d1",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fredbarbender.jfif?alt=media&token=6c4c87cd-2273-49ef-8757-7a4832be010b",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fscreed.jpg?alt=media&token=3ddc7536-a799-4ad0-ab79-24b49452dbc5",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Ffloat.jfif?alt=media&token=0854b502-46b7-49b2-8496-0fd32f76f7b8",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fbricktrow.jfif?alt=media&token=794e3e7a-029f-4a3f-95d5-e9e92934b8e3",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fpointtow.jpg?alt=media&token=7ba4e9fc-2a95-41b0-9aa8-b6480bfbf5a6",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fplater.jfif?alt=media&token=2e35c721-3fe1-4de4-bd86-65a0c708e00f",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fwallhammer.jpg?alt=media&token=c8c4b455-f4f0-4c82-ba38-c7ede8d7fe9f",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fdrysaw.jpg?alt=media&token=207d946c-591d-409d-baf9-af1a1eb77442",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fcaulgun.png?alt=media&token=2978a17f-9ca9-43d6-895f-8984c7702d8b",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fpaintsray.jfif?alt=media&token=3cae0fd5-3a1f-4997-be64-ac0ee86d7243",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fwasher.jfif?alt=media&token=41aca099-cff7-42af-85a2-729a1723119e",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fharnes.jfif?alt=media&token=beef92ea-a64f-449d-9f0d-55792848997e",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fhardhat.jfif?alt=media&token=f7bbff13-8e05-4441-a2fb-c452564f5a68",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fwelding.jfif?alt=media&token=d6f7e494-f113-4840-970f-d66e1bb0d368",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fsafeglass.jfif?alt=media&token=d6ab847e-1517-4c27-820e-8a680f86c3f9",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fgloves.jfif?alt=media&token=d08b70a4-ce96-4869-9ee4-7812b7b86650",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fwet.jfif?alt=media&token=8297d965-7782-4c69-b003-dce597298396",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fnosmoke.jpg?alt=media&token=3f3d7a96-1c9e-45d5-9800-6ffb60dcf013",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Fexit.jpg?alt=media&token=d21b48b8-1158-44b1-93d3-8e6813480c7c",
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
                pictureUrl:
                    "https://firebasestorage.googleapis.com/v0/b/react-upload-file-75466.appspot.com/o/caps%2Fimage%2Ffire.jfif?alt=media&token=88b5833d-76be-452b-8c02-c5a0a58a6494",
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
