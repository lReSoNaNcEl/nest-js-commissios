import { ReportDocument } from "../entities/ReportDocument.entity";

export interface IDocumentsController {
    uploadDocumentsOfReport(files: Express.Multer.File[], reportId: number): Promise<ReportDocument[]>
}
