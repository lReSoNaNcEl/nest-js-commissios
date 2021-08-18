import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ReviewReportDto {

    @ApiProperty()
    @IsString()
    @MaxLength(1000)
    @IsNotEmpty()
    title: string

}
