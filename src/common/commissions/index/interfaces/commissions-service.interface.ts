import { CreateCommissionDto } from "../dto/create-commission.dto";
import { Commission } from "../entities/Commission.entity";
import { UpdateCommissionDto } from "../dto/update-commission.dto";
import { PaginationCommissionsQueryDto } from "../dto/pagination-commissions-query.dto";
import { User } from "../../../users/entities/User.entity";
import { SearchCommissionsQueryDto } from "../dto/search-commissions.query.dto";

export interface ICommissionsService {
    getCommission(commissionId: number): Promise<Commission>
    getCommissions: (paginationQuery: PaginationCommissionsQueryDto, searchQuery: SearchCommissionsQueryDto, user: User) => Promise<[Commission[], number]>
    createCommission: (dto: CreateCommissionDto) => Promise<Commission>
    updateCommission(dto: UpdateCommissionDto, commissionId: number): Promise<Commission>
}
