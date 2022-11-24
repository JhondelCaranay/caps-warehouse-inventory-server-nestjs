import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto {
    @IsNotEmpty()
    @IsString()
    // only characters, numbers and whitespace regex
    // @Matches(/^[a-zA-Z0-9\s]+$/, {
    //     message: "name can only contain characters, numbers and whitespace",
    // })
    name: string;
}
