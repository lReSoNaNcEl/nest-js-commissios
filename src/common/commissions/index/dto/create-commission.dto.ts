import { Column, ManyToOne } from "typeorm";
import { CommissionImportance, CommissionLevel } from "../interfaces/commission.interface";
import { Category } from "../../categories/enitities/Category.entity";
import { Source } from "../../sources/entities/Source.entity";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateCommissionDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    text: string

    @ApiProperty()
    @IsEnum(CommissionImportance)
    @IsOptional()
    importance: CommissionImportance

    @ApiProperty()
    @IsEnum(CommissionLevel)
    @IsOptional()
    level: CommissionLevel


    rate: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    registrationCardNumber: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    positionNumber: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    sourceNumber: string

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    release: string

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    expiration: string

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    registrationCardDate: string

    @IsNumber()
    @IsOptional()
    categoryId: number

    @IsNumber()
    @IsOptional()
    sourceId: number

}
