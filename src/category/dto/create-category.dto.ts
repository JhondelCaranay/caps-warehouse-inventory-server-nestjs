import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    // only characters anf whitespace regex
    @Matches(/^[a-zA-Z\s]+$/, {
        message: "name can only contain characters and whitespace",
    })
    name: string;
}
