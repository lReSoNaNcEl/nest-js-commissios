import { ICommissionsRepository } from "./interfaces/commissions-repository.interface";
import { Brackets, EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import { Commission } from "./entities/Commission.entity";
import { NotFoundException } from "@nestjs/common";
import { Report } from "../reports/index/entities/Report.entity";
import { PaginationCommissionsQueryDto } from "./dto/pagination-commissions-query.dto";
import { User } from "../../users/entities/User.entity";
import { Roles } from "../../users/interfaces/user.interface";
import { SearchCommissionsQueryDto } from "./dto/search-commissions.query.dto";

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

    getCommissions(paginationQuery: PaginationCommissionsQueryDto, searchQuery: SearchCommissionsQueryDto, user: User) {
        switch (user.role) {
            case Roles.ADMIN: {
                return this.getCommissionsOfAdmin(paginationQuery, searchQuery)
            }
            case Roles.IMPLEMENTOR: {
                return this.getCommissionsOfImplementor(paginationQuery, searchQuery, user.id)
            }
        }
    }

    getCommissionsOfAdmin(paginationQuery: PaginationCommissionsQueryDto, searchQuery: SearchCommissionsQueryDto): Promise<Commission[]> {
        const {page, limit} = paginationQuery
        let qb = this.createQueryBuilder('commission')
        qb = this.setSearchCommissionsToQueryBuilder(qb, searchQuery)

        qb.leftJoinAndSelect('commission.category', 'category')
            .leftJoinAndSelect('commission.source', 'source')
            .take(limit)
            .skip(page - 1)

        return qb.getMany()
    }

    getCommissionsOfImplementor(paginationQuery: PaginationCommissionsQueryDto, searchQuery: SearchCommissionsQueryDto, userId: number): Promise<Commission[]> {
        const {page, limit} = paginationQuery
        let qb = this.createQueryBuilder('commission')
        qb = this.setSearchCommissionsToQueryBuilder(qb, searchQuery)

        qb.innerJoinAndMapMany('commission.reports', Report, 'report', `commission.id = report.commission.id and report.user.id = :userId`, {userId})
            .leftJoinAndSelect('report.documents', 'document')
            .leftJoinAndSelect('commission.category', 'category')
            .leftJoinAndSelect('commission.source', 'source')
            .leftJoinAndSelect('commission.documents', 'documents')
            .take(limit)
            .skip(page - 1)

        return qb.getMany()

    }

    setSearchCommissionsToQueryBuilder(qb: SelectQueryBuilder<Commission>, searchQuery: SearchCommissionsQueryDto): SelectQueryBuilder<Commission> {
        const {title, text, level, categoryId, sourceId, importance, rate} = searchQuery

        qb.where(new Brackets((qb) => {
            if (title) qb.where(`commission.title ilike :title`, {title: `%${title}%`})
            if (text) qb.andWhere(`commission.text ilike :text`, {text: `%${text}%`})
            if (level) qb.andWhere(`commission.level = :level`, {level})
            if (rate) qb.andWhere(`commission.rate = :rate`, {rate})
            if (importance) qb.andWhere(`commission.importance = :importance`, {importance})
            if (categoryId) qb.andWhere(`commission.categoryId = :categoryId`, {categoryId})
            if (sourceId) qb.andWhere(`commission.sourceId = :sourceId`, {sourceId})
        }))

        return qb
    }

}
