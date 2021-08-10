import { ApiProperty } from "@nestjs/swagger";
import * as faker from "faker";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class AuthLoginDto {

    @ApiProperty({example: faker.name.jobArea()})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({example: faker.internet.password(20)})
    @IsString()
    @IsNotEmpty()
    password: string

}
