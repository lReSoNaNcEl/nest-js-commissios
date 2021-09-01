import { ReportDocument } from "../entities/ReportDocument.entity"
import { DeleteResult } from "typeorm";

export interface IDocumentsService {
    uploadDocumentsOfReport(files: Express.Multer.File[], reportId: number): Promise<ReportDocument[]>
    deleteDocument(documentId: number): Promise<DeleteResult>
    getDocument(documentId: number): Promise<ReportDocument>
}
