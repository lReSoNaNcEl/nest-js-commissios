import { Commission } from "../entities/Commission.entity";
import { PaginationCommissionsQueryDto } from "../dto/pagination-commissions-query.dto";
import { SearchCommissionsQueryDto } from "../dto/search-commissions.query.dto";

export interface ICommissionsRepository {
    getCommission(commissionId: number): Promise<Commission>
    getCommissionOfImplementor: (commissionId: number, userId: number) => Promise<Commission>
    getCommissionOfAdmin: (commissionId: number) => Promise<Commission>
    getCommissionsOfAdmin: (paginationQuery: PaginationCommissionsQueryDto, searchQuery: SearchCommissionsQueryDto) => Promise<[Commission[], number]>
    getCommissionsOfImplementor: (paginationQuery: PaginationCommissionsQueryDto, searchQuery: SearchCommissionsQueryDto, userId: number) => Promise<[Commission[], number]>
}
