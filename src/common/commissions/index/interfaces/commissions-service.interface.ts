import { CreateCommissionDto } from "../dto/create-commission.dto";
import { Commission } from "../entities/Commission.entity";

export interface ICommissionsService {
    createCommission: (dto: CreateCommissionDto) => Promise<Commission>
    getCommissions: () => Promise<Commission[]>
}
