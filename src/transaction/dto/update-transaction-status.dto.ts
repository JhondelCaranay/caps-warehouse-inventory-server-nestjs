import { TRANSACTION_STATUS } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateTransactionStatusDto {
    @IsOptional()
    @IsString()
    remarks: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(TRANSACTION_STATUS, {
        message: `action  must be one of the following: ( ${Object.values(TRANSACTION_STATUS).join(", ")} )`,
    })
    status: TRANSACTION_STATUS;
}
