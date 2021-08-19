import { Body, Controller, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger"
import { ReportsService } from "./reports.service"
import { IReportsController } from "./interfaces/reports-controller.interface"
import {ReportsReviewAccess} from "./guards/report-review-access.decorator"
import { VerifyReportDto } from "./dto/verify-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { ReportAccess } from "./guards/report-access.decorator";
import { Auth } from "../../../auth/auth.decorator";
import { Roles } from "../../../users/interfaces/user.interface";
import { CreateReportDto } from "./dto/create-report.dto";

@ApiTags('Reports Of Commissions')
@Controller('commissions/reports')
export class ReportsController implements IReportsController {

    constructor(
        private reportsService: ReportsService
    ) {}

    @ReportsReviewAccess()
    @Post(':reportId/review')
    sendReportToReview(@Param('reportId', ParseIntPipe) reportId: number) {
        return this.reportsService.sendReportToReview(reportId)
    }

    @Auth(Roles.ADMIN)
    @Post(':reportId/verify')
    verifyReport(@Body() dto: VerifyReportDto, @Param('reportId', ParseIntPipe) reportId: number) {
        return this.reportsService.verifyReport(dto, reportId)
    }

    @Auth(Roles.ADMIN)
    @Post()
    createReport(@Body() dto: CreateReportDto) {
        return this.reportsService.createReport(dto)
    }

    @ReportAccess()
    @Put(':reportId')
    updateReport(@Body() dto: UpdateReportDto, @Param('reportId', ParseIntPipe) reportId: number) {
        return this.reportsService.updateReport(dto, reportId)
    }

}
