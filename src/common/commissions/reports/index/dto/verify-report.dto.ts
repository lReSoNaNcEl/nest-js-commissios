import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsIn, IsNotEmpty } from "class-validator";
import { ReportStatus } from "../entities/Report.entity";

export class VerifyReportDto {

    @ApiProperty({enum: ReportStatus})
    @IsEnum(ReportStatus)
    @IsIn([ReportStatus.CONFIRMED, ReportStatus.RETURNED])
    @IsNotEmpty()
    status: ReportStatus

}
