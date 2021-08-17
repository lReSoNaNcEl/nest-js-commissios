import { Report } from "../entities/Report.entity";
import { CreateReportDto } from "../dto/create-report.dto";
import { User } from "../../../../users/entities/User.entity";

export interface IReportsService {
    getReport: (reportId: number) => Promise<Report>
    createManyReports: (user: User[], commissionId: number) => Promise<Report[]>
    createReport: (dto: CreateReportDto) => Promise<Report>
}
