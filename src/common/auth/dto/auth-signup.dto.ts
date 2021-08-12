import { AuthLoginDto } from "./auth-login.dto";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "../../users/interfaces/user.interface";
import { ApiProperty } from "@nestjs/swagger";
import * as faker from "faker";

export class AuthSignupDto extends AuthLoginDto {

    @ApiProperty({type: String, enum: Roles, example: Roles.IMPLEMENTOR, default: Roles.IMPLEMENTOR})
    @IsNotEmpty()
    @IsEnum(Roles)
    role: Roles = Roles.IMPLEMENTOR

    @ApiProperty({example: faker.company.companyName()})
    @IsNotEmpty()
    @IsString()
    name: string

}
