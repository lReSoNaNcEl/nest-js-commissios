import { Body, Controller, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger"
import { ReportsService } from "./reports.service"
import { IReportsController } from "./interfaces/reports-controller.interface"
import { ReviewReportDto } from "./dto/review-report.dto"
import { Auth } from "../../../auth/auth.decorator";
import { Roles } from "../../../users/interfaces/user.interface";
import {ReportsReviewAccess} from "./guards/report-review-access.decorator"
import { VerifyReportDto } from "./dto/verify-report.dto";

@ApiTags('Reports Of Commissions')
@Controller('commissions/reports')
export class ReportsController implements IReportsController {

    constructor(
        private reportsService: ReportsService
    ) {}

    @ReportsReviewAccess()
    @Post(':reportId/review')
    sendReportToReview(@Body() dto: ReviewReportDto, @Param('reportId', ParseIntPipe) reportId: number) {
        return this.reportsService.sendReportToReview(dto, reportId)
    }

    // @Auth(Roles.ADMIN)
    @Post(':reportId/verify')
    verifyReport(@Body() dto: VerifyReportDto, @Param('reportId', ParseIntPipe) reportId: number) {
        return this.reportsService.verifyReport(dto, reportId)
    }

}
