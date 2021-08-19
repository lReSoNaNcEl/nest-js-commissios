import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateReportDto {

    @ApiProperty()
    @IsString()
    @MaxLength(1000)
    @IsOptional()
    title: string

}
