import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class UpdatePasswordDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(6) // password at least 6 character
    @Matches(/^(?=.*[A-Z]).+$/, {
        message: "password must contain at least 1 uppercase character",
    }) // atleast 1 uppercase only
    password: string;
}
