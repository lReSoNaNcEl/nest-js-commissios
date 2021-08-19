import { Report } from "../entities/Report.entity";
import { VerifyReportDto } from "../dto/verify-report.dto";
import { UpdateReportDto } from "../dto/update-report.dto";
import { CreateReportDto } from "../dto/create-report.dto";

export interface IReportsController {
    sendReportToReview: (reportId: number) => Promise<Report>
    verifyReport: (dto: VerifyReportDto, reportId: number) => Promise<Report>
    createReport: (dto: CreateReportDto) => Promise<Report>
    updateReport: (dto: UpdateReportDto, reportId: number) => Promise<Report>
}
