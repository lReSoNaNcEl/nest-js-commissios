import { ReportDocument } from "../entities/ReportDocument.entity";

export interface IDocumentsRepository {
    getDocument(documentId: number): Promise<ReportDocument>
}
