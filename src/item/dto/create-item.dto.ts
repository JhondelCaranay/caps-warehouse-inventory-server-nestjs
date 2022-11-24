// name        String  @unique
// description String?
// model       String
// unit        UNIT    @default(UNIT)
// stock       STOCK   @default(IN_STOCK)
// price       Float
// pictureUrl  String?
// categoryId String?

import { STOCK, UNIT } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

// brandId    String?
export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    model: string;

    @IsNotEmpty()
    @IsEnum(UNIT, { message: `unit  must be one of the following: ( ${Object.values(UNIT).join(", ")} )` })
    unit: UNIT;

    @IsNotEmpty()
    @IsEnum(STOCK, { message: `stock  must be one of the following: ( ${Object.values(STOCK).join(", ")} )` })
    stock: STOCK;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    pictureUrl: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    categoryId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    brandId: string;
}
