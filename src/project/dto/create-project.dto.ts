import { PROJECT_STATUS } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    // only characters and whitespace regex
    @Matches(/^[a-zA-Z\s]+$/, {
        message: "name can only contain characters and whitespace",
    })
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;

    @IsOptional()
    @IsEnum(PROJECT_STATUS, {
        message: `status  must be one of the following: ( ${Object.values(PROJECT_STATUS).join(", ")} )`,
    })
    status: PROJECT_STATUS;
}
