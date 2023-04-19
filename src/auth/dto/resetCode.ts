import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetCodeDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    code: string;
}
