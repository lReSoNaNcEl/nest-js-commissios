import { IsNumber, IsOptional, IsPositive, Max, Min } from "class-validator";
import {ApiProperty} from "@nestjs/swagger"
import { Transform, Type } from "class-transformer";

export class PaginationCommissionsQueryDto {

    @ApiProperty({default: 1, required: false})
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Min(1)
    page: number = 1

    @ApiProperty({default: 10, required: false})
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Min(1)
    @Max(100)
    limit: number = 10

}
