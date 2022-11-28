import { IsNotEmpty, IsString, IsUUID, Matches } from "class-validator";

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
}
