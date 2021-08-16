import { Report } from "../entities/Report.entity";
import { CreateReportDto } from "../dto/create-report.dto";

export interface IReportsService {
    createReport: (dto: CreateReportDto) => Promise<Report>
}
