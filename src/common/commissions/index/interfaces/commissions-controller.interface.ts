import { Commission } from "../entities/Commission.entity";
import { CreateCommissionDto } from "../dto/create-commission.dto";
import { UpdateCommissionDto } from "../dto/update-commission.dto";

export interface ICommissionsController {
    getCommission: (commissionId: number) => Promise<Commission>
    getCommissions: () => Promise<Commission[]>
    createCommission: (dto: CreateCommissionDto, documents: Express.Multer.File[]) => Promise<Commission>
    updateCommission: (dto: UpdateCommissionDto, commissionId: number) => Promise<Commission>
}
