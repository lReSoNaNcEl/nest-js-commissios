import { Report } from "../entities/Report.entity";

export interface IReportsRepository {
    getReport(reportId: number): Promise<Report>
}
