import { CommissionImportance, CommissionLevel, CommissionRate } from "../interfaces/commission.interface";
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { Type } from "class-transformer";

export class SearchCommissionsQueryDto {

    @IsString()
    @IsOptional()
    title: string = ''

    @IsString()
    @IsOptional()
    text: string = ''

    @IsEnum(CommissionLevel)
    @IsOptional()
    level: CommissionLevel

    @IsEnum(CommissionImportance)
    @IsOptional()
    importance: CommissionImportance

    @IsEnum(CommissionRate)
    @IsOptional()
    @IsOptional()
    rate: CommissionRate

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @IsOptional()
    categoryId: number

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @IsOptional()
    sourceId: number

}

