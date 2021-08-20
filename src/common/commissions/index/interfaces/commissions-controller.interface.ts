import { Commission } from "../entities/Commission.entity";
import { CreateCommissionDto } from "../dto/create-commission.dto";
import { UpdateCommissionDto } from "../dto/update-commission.dto";
import { PaginationCommissionsQueryDto } from "../dto/pagination-commissions-query.dto";
import { Request } from "express";
import { SearchCommissionsQueryDto } from "../dto/search-commissions.query.dto";

export interface ICommissionsController {
    getCommission: (commissionId: number) => Promise<Commission>
    getCommissions: (paginationQuery: PaginationCommissionsQueryDto, searchQuery: SearchCommissionsQueryDto, req: Request) => Promise<[Commission[], number]>
    createCommission: (dto: CreateCommissionDto, documents: Express.Multer.File[]) => Promise<Commission>
    updateCommission: (dto: UpdateCommissionDto, commissionId: number) => Promise<Commission>
}
