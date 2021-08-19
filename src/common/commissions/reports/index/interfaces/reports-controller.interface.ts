import { ReviewReportDto } from "../dto/review-report.dto";
import { Report } from "../entities/Report.entity";
import { VerifyReportDto } from "../dto/verify-report.dto";
import { UpdateReportDto } from "../dto/update-report.dto";

export interface IReportsController {
    sendReportToReview: (dto: ReviewReportDto,reportId: number) => Promise<Report>
    verifyReport: (dto: VerifyReportDto, reportId: number) => Promise<Report>
    updateReport: (dto: UpdateReportDto, reportId: number) => Promise<Report>
}
