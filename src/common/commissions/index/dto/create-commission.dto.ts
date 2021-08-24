import { CommissionImportance, CommissionLevel, CommissionRate } from "../interfaces/commission.interface";
import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsPositive,
    ArrayMinSize,
    Max, MaxLength
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import * as faker from "faker";

export class CreateCommissionDto {

    @ApiProperty({example: faker.lorem.word(5)})
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    title: string

    @ApiProperty({example: faker.lorem.text(10)})
    @IsString()
    @MaxLength(2000)
    @IsNotEmpty()
    text: string

    @ApiProperty({enum: CommissionImportance, default: CommissionImportance.USUALLY, required: false})
    @IsEnum(CommissionImportance)
    @IsOptional()
    importance: CommissionImportance

    @ApiProperty({enum: CommissionLevel, nullable: true, required: false})
    @IsEnum(CommissionLevel)
    @IsOptional()
    level: CommissionLevel

    @ApiProperty({enum: CommissionRate, default: CommissionRate.ONCE, required: false})
    @IsEnum(CommissionRate)
    @IsOptional()
    rate: CommissionRate

    @ApiProperty({example: faker.finance.creditCardNumber(), required: false})
    @IsString()
    @IsOptional()
    registrationCardNumber: string

    @ApiProperty({example: faker.finance.currencyCode()})
    @IsString()
    @IsNotEmpty()
    positionNumber: string

    @ApiProperty({example: faker.date.recent()})
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    release: string

    @ApiProperty({example: faker.date.soon()})
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    expiration: string

    @ApiProperty({example: faker.date.past(), required: false})
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    registrationCardDate: string

    @ApiProperty({default: null, example: faker.datatype.number(20), required: false})
    @IsNumber()
    @IsOptional()
    categoryId: number = null

    @ApiProperty({default: null, example: faker.datatype.number(20), required: false})
    @IsNumber()
    @IsOptional()
    sourceId: number = null

    @ApiProperty({type: Array, example: Array(3).fill(null).map(() => faker.datatype.number(20))})
    @ArrayMinSize(1)
    @IsNumber({}, {each: true})
    @IsPositive({each: true})
    @IsNotEmpty()
    implementors: number[]

}
