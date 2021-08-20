import { CommissionImportance, CommissionLevel, CommissionRate } from "../interfaces/commission.interface";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import * as faker from "faker";

export class SearchCommissionsQueryDto {

    @ApiProperty({example:  faker.lorem.word(5), required: false})
    @IsString()
    @IsOptional()
    title: string = ''

    @ApiProperty({example: faker.lorem.text(5), required: false})
    @IsString()
    @IsOptional()
    text: string = ''

    @ApiProperty({enum: CommissionLevel, required: false})
    @IsEnum(CommissionLevel)
    @IsOptional()
    level: CommissionLevel

    @ApiProperty({enum: CommissionImportance, required: false})
    @IsEnum(CommissionImportance)
    @IsOptional()
    importance: CommissionImportance

    @ApiProperty({enum: CommissionRate, required: false})
    @IsEnum(CommissionRate)
    @IsOptional()
    @IsOptional()
    rate: CommissionRate

    @ApiProperty({example: faker.datatype.number(30), required: false})
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @IsOptional()
    categoryId: number

    @ApiProperty({example: faker.datatype.number(30), required: false})
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @IsOptional()
    sourceId: number

}
