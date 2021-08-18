import { CreateCommissionDto } from "../dto/create-commission.dto";
import { Commission } from "../entities/Commission.entity";
import { UpdateCommissionDto } from "../dto/update-commission.dto";

export interface ICommissionsService {
    getCommission(commissionId: number): Promise<Commission>
    getCommissions: () => Promise<Commission[]>
    createCommission: (dto: CreateCommissionDto) => Promise<Commission>
    updateCommission(dto: UpdateCommissionDto, commissionId: number): Promise<Commission>
}
