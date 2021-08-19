import { Report } from "../entities/Report.entity";
import { CreateReportDto } from "../dto/create-report.dto";
import { User } from "../../../../users/entities/User.entity";
import { VerifyReportDto } from "../dto/verify-report.dto";
import { UpdateReportDto } from "../dto/update-report.dto";

export interface IReportsService {
    getReport: (reportId: number) => Promise<Report>
    createManyReports: (user: User[], commissionId: number) => Promise<Report[]>
    createReport: (dto: CreateReportDto) => Promise<Report>
    sendReportToReview: (reportId: number) => Promise<Report>
    verifyReport: (dto: VerifyReportDto, reportId: number) => Promise<Report>
    updateReport(dto: UpdateReportDto, reportId: number): Promise<Report>
}
