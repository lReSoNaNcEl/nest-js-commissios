import { ApiProperty } from "@nestjs/swagger";
import * as faker from "faker";
import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength
} from "class-validator";
import { CommissionImportance, CommissionLevel, CommissionRate } from "../interfaces/commission.interface";
import { Type } from "class-transformer";

export class UpdateCommissionDto {

    @ApiProperty({example: faker.lorem.word(5), required: false})
    @IsString()
    @MaxLength(255)
    @IsOptional()
    title: string

    @ApiProperty({example: faker.lorem.text(10), required: false})
    @IsString()
    @MaxLength(2000)
    @IsOptional()
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

    @ApiProperty({example: faker.finance.currencyCode(), required: false})
    @IsString()
    @IsOptional()
    positionNumber: string

    @ApiProperty({example: faker.date.recent(), required: false})
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    release: string

    @ApiProperty({example: faker.date.soon(), required: false})
    @IsDate()
    @Type(() => Date)
    @IsOptional()
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

}
