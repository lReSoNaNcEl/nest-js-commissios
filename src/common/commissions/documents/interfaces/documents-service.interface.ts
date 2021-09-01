import { CommissionDocument } from "../entities/CommissionDocument.entity";
import { DeleteResult } from "typeorm";

export interface IDocumentsService {
    getDocument(documentId: number): Promise<CommissionDocument>
    uploadDocumentsOfCommission(files: Express.Multer.File[], commissionId: number): Promise<CommissionDocument[]>
    deleteDocument(documentId: number): Promise<DeleteResult>
}
