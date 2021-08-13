import { ApiProperty } from "@nestjs/swagger";
import * as faker from "faker";
import {IsEmail, IsNotEmpty, IsString} from "class-validator"

export class AuthLoginDto {

    @ApiProperty({example: faker.internet.email()})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({example: faker.internet.password(20)})
    @IsString()
    @IsNotEmpty()
    password: string

}
