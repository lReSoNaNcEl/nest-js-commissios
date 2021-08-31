import { ApiProperty } from "@nestjs/swagger";
import * as faker from "faker";
import { IsOptional, IsString } from "class-validator";

export class UpdateSourceDto {

    @ApiProperty({example: faker.lorem.word(4)})
    @IsString()
    @IsOptional()
    title: string

}
