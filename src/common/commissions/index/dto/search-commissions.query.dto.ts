import { CommissionImportance, CommissionLevel, CommissionRate } from "../interfaces/commission.interface";
import { IsDate, IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import * as faker from "faker";
import { ReportStatus } from "../../reports/index/entities/Report.entity";

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
    rate: CommissionRate

    @ApiProperty({enum: ReportStatus, required: false})
    @IsEnum(ReportStatus)
    @IsOptional()
    status: ReportStatus

    @ApiProperty({example: faker.datatype.number(30), required: false})
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @IsOptional()
    implementorId: number

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

    @ApiProperty({example: faker.date.recent(), required: false})
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    expirationInitial: string

    @ApiProperty({example: faker.date.future(), required: false})
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    expirationFinal: string

    @ApiProperty({example: faker.date.recent(), required: false})
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    releaseInitial: string

    @ApiProperty({example: faker.date.future(), required: false})
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    releaseFinal: string

}

