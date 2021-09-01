import { CommissionDocument } from "../entities/CommissionDocument.entity";
import { DeleteResult } from "typeorm";

export interface IDocumentsController {
    uploadDocumentsOfCommission(files: Express.Multer.File[], commissionId: number): Promise<CommissionDocument[]>
    deleteDocument(documentId: number): Promise<DeleteResult>
}
