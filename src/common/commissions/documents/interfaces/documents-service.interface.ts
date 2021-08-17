import { CommissionDocument } from "../entities/CommissionDocument.entity";

export interface IDocumentsService {
    uploadDocumentsOfCommission(files: Express.Multer.File[], commissionId: number): Promise<CommissionDocument[]>
}
