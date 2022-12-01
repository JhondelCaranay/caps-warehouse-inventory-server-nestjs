import { ROLE, USER_STATUS } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z\s]+$/, {
        message: "first_name can only contain characters and whitespace",
    })
    first_name: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z\s]+$/, {
        message: "last_name can only contain characters and whitespace",
    })
    last_name: string;

    @IsString()
    @Matches(/^[a-zA-Z\s]+$/, {
        message: "position can only contain characters and whitespace",
    })
    position: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    contact: string;

    @IsOptional()
    @IsString()
    @IsUrl({}, { message: "avatarUrl must be a valid url" })
    avatarUrl: string;

    @IsOptional()
    @IsEnum(USER_STATUS, {
        message: `status  must be one of the following: ( ${Object.values(USER_STATUS).join(", ")} )`,
    })
    status: USER_STATUS;

    @IsNotEmpty()
    @IsEnum(ROLE, { message: `role  must be one of the following: ( ${Object.values(ROLE).join(", ")} )` })
    role: ROLE;
}
