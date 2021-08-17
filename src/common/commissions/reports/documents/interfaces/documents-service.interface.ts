import { ReportDocument } from "../entities/ReportDocument.entity"

export interface IDocumentsService {
    uploadDocumentsOfReport(files: Express.Multer.File[], reportId: number): Promise<ReportDocument[]>
}
