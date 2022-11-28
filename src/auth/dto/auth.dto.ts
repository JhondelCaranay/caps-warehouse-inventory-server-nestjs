import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    // @IsNotEmpty()
    // @IsString()
    // @Matches(/^[a-zA-Z\s]+$/, {
    //     message: "first_name can only contain characters and whitespace",
    // })
    // first_name: string;

    // @IsNotEmpty()
    // @IsString()
    // @Matches(/^[a-zA-Z\s]+$/, {
    //     message: "last_name can only contain characters and whitespace",
    // })
    // last_name: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    // @MinLength(6) // password at least 6 character
    // @Matches(/^(?=.*[A-Z]).+$/, {
    //     message: "password must contain at least 1 uppercase character",
    // }) // atleast 1 uppercase only
    password: string;
}
