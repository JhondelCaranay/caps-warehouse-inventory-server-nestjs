import { ACTION } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsInt()
    quantity: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    remarks: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(ACTION, { message: `action  must be one of the following: ( ${Object.values(ACTION).join(", ")} )` })
    action: ACTION;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    itemId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    projectId: string;
}
