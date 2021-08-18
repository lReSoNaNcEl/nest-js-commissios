import { ICommissionsRepository } from "./interfaces/commissions-repository.interface";
import { EntityRepository, Repository } from "typeorm";
import { Commission } from "./entities/Commission.entity";
import { NotFoundException } from "@nestjs/common";
import { Report } from "../reports/index/entities/Report.entity";
import { PaginationCommissionsQueryDto } from "./dto/pagination-commissions-query.dto";
import { User } from "../../users/entities/User.entity";
import { Roles } from "../../users/interfaces/user.interface";

@EntityRepository(Commission)
export class CommissionsRepository extends Repository<Commission> implements ICommissionsRepository {

    getCommission(commissionId: number): Promise<Commission> {
        const commission = this.findOne({
            where: {
                id: commissionId
            },
            relations: ['reports', 'reports.documents', 'category', 'source', 'documents']
        })
        if (!commission) throw new NotFoundException(`Commission with ID ${commissionId} not found!`)
        return commission
    }

    getCommissions(query: PaginationCommissionsQueryDto, user: User) {
        switch (user.role) {
            case Roles.ADMIN: {
                return this.getCommissionsOfAdmin(query)
            }
            case Roles.IMPLEMENTOR: {
                return this.getCommissionsOfImplementor(query, user.id)
            }
        }
    }

    getCommissionsOfAdmin(query: PaginationCommissionsQueryDto): Promise<Commission[]> {
        const {page, limit} = query
        return this.find({
            take: limit,
            skip: page,
            relations: ['category', 'source'],
        })
    }

    getCommissionsOfImplementor(query: PaginationCommissionsQueryDto, userId: number): Promise<Commission[]> {
        const {page, limit} = query
        return this.createQueryBuilder('commission')
            .innerJoinAndMapMany('commission.reports', Report, 'report', `commission.id = report.commission.id and report.user.id = :userId`, {userId})
            .leftJoinAndSelect('report.documents', 'document')
            .leftJoinAndSelect('commission.category', 'category')
            .leftJoinAndSelect('commission.source', 'source')
            .leftJoinAndSelect('commission.documents', 'documents')
            .take(limit)
            .skip(page)
            .getMany()
    }

}
