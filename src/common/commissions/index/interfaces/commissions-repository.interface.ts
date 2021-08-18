import { Commission } from "../entities/Commission.entity";
import { User } from "../../../users/entities/User.entity";
import { PaginationCommissionsQueryDto } from "../dto/pagination-commissions-query.dto";

export interface ICommissionsRepository {
    getCommission(commissionId: number): Promise<Commission>
    getCommissionsOfAdmin: (query: PaginationCommissionsQueryDto) => Promise<Commission[]>
    getCommissionsOfImplementor: (query: PaginationCommissionsQueryDto, userId: number) => Promise<Commission[]>
}
