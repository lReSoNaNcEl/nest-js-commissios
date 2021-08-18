import { IsNumber, IsOptional, IsPositive, Max, Min } from "class-validator";
import {ApiProperty} from "@nestjs/swagger"
import {Type} from "class-transformer"

export class PaginationCommissionsQueryDto {

    @ApiProperty({default: 1})
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Min(1)
    page: number = 1

    @ApiProperty({default: 10})
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Min(1)
    @Max(100)
    limit: number = 10

}
