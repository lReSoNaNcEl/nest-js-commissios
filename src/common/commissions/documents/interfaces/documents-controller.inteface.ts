import { CommissionDocument } from "../entities/CommissionDocument.entity";

export interface IDocumentsController {
    uploadDocumentsOfCommission(files: Express.Multer.File[], commissionId: number): Promise<CommissionDocument[]>
}
