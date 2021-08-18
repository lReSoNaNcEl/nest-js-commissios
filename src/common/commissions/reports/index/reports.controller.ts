import { Controller, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger"
import { ReportsService } from "./reports.service"
import { IReportsController } from "./interfaces/reports-controller.interface"
import { ReviewReportDto } from "./dto/review-report.dto"
import { Auth } from "../../../auth/auth.decorator";
import { Roles } from "../../../users/interfaces/user.interface";
import {ReportsReviewAccess} from "./guards/report-review-access.decorator"

@ApiTags('Reports Of Commissions')
@Controller('commissions/reports')
export class ReportsController implements IReportsController {

    constructor(
        private reportsService: ReportsService
    ) {}

    @ReportsReviewAccess()
    @Post(':reportId/review')
    sendReportToReview(dto: ReviewReportDto, @Param('reportId', ParseIntPipe) reportId: number) {
        return this.reportsService.sendReportToReview(dto, reportId)
    }

}
