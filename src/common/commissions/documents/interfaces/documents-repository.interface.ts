import { CommissionDocument } from "../entities/CommissionDocument.entity";

export interface IDocumentsRepository {
    getDocument(documentId: number): Promise<CommissionDocument>
}
