import { UNIT } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

// brandId    String?
export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    model: string;

    @IsNotEmpty()
    @IsEnum(UNIT, { message: `unit  must be one of the following: ( ${Object.values(UNIT).join(", ")} )` })
    unit: UNIT;

    // @IsOptional()
    // @IsEnum(STOCK, { message: `stock  must be one of the following: ( ${Object.values(STOCK).join(", ")} )` })
    // stock: STOCK;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsNotEmpty()
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
