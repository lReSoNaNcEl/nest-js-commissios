import { ApiProperty } from "@nestjs/swagger";
import * as faker from "faker";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({example: faker.lorem.word(4)})
    @IsString()
    @IsNotEmpty()
    title: string

}
