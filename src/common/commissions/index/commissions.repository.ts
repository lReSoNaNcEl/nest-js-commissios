import { ICommissionsRepository } from "./interfaces/commissions-repository.interface";
import { Brackets, EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import { Commission } from "./entities/Commission.entity";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Report } from "../reports/index/entities/Report.entity";
import { PaginationCommissionsQueryDto } from "./dto/pagination-commissions-query.dto"
import { User } from "../../users/entities/User.entity";
import { Roles } from "../../users/interfaces/user.interface";
import { SearchCommissionsQueryDto } from "./dto/search-commissions.query.dto";
import { cache } from "../../../main";
import { Cache } from "../../../core/cache";

@EntityRepository(Commission)
export class CommissionsRepository extends Repository<Commission> implements ICommissionsRepository {

    getCommission(commissionId: number): Promise<Commission> {
        const user: User = cache.get(Cache.CURRENT_USER)

        switch (user.role) {
            case Roles.ADMIN: {return this.getCommissionOfAdmin(commissionId)}
            case Roles.IMPLEMENTOR: {return this.getCommissionOfImplementor(commissionId, user.id)}
        }
    }

    async getCommissionOfImplementor(commissionId: number, userId: number) {
        let commission = await this.findOne({ where: {id: commissionId}})
        if (!commission) throw new NotFoundException(`Commission with ID ${commissionId} not found!`)

        commission = await this.createQueryBuilder('commission')
            .innerJoinAndMapMany('commission.reports', Report, 'report', `report.commissionId = :commissionId and report.user.id = :userId`, {userId, commissionId})
            .leftJoinAndSelect('report.documents', 'reportDocuments')
            .leftJoinAndSelect('report.user', 'user')
            .leftJoinAndSelect('commission.category', 'category')
            .leftJoinAndSelect('commission.source', 'source')
            .leftJoinAndSelect('commission.documents', 'commissionDocuments')
            .where('commission.id = :commissionId', {commissionId})
            .getOne()

        if (!commission) throw new ForbiddenException(`You are not the implementor of the commission ${commissionId}!`)

        return commission
    }

    async getCommissionOfAdmin(commissionId: number) {
        const commission = this.findOne({
            where: {id: commissionId},
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

    getCommissionsOfAdmin(paginationQuery: PaginationCommissionsQueryDto, searchQuery: SearchCommissionsQueryDto): Promise<[Commission[], number]> {
        const {page, limit} = paginationQuery
        let qb = this.createQueryBuilder('commission')

        qb.innerJoinAndMapMany('commission.reports', Report, 'report', 'commission.id = report.commission.id')
            .leftJoinAndSelect('report.user', 'user')
            .leftJoinAndSelect('commission.category', 'category')
            .leftJoinAndSelect('commission.source', 'source')
            .leftJoinAndSelect('commission.documents', 'documents')
            .addOrderBy('commission.id', 'ASC')
            .take(limit)
            .skip((page - 1) * limit)

        qb = this.setSearchCommissionsToQueryBuilder(qb, searchQuery)

        return qb.getManyAndCount()
    }

    getCommissionsOfImplementor(paginationQuery: PaginationCommissionsQueryDto, searchQuery: SearchCommissionsQueryDto, userId: number): Promise<[Commission[], number]> {
        const {page, limit} = paginationQuery
        let qb = this.createQueryBuilder('commission')
        qb = this.setSearchCommissionsToQueryBuilder(qb, searchQuery)

        qb.innerJoinAndMapMany('commission.reports', Report, 'report', `commission.id = report.commission.id and report.user.id = :userId`, {userId})
            .leftJoinAndSelect('commission.category', 'category')
            .leftJoinAndSelect('commission.source', 'source')
            .leftJoinAndSelect('commission.documents', 'documents')
            .take(limit)
            .skip((page - 1) * limit)

        return <any>qb.getManyAndCount()

    }

    setSearchCommissionsToQueryBuilder(qb: SelectQueryBuilder<Commission>, searchQuery: SearchCommissionsQueryDto): SelectQueryBuilder<Commission> {
        const {title, text, level, categoryId, sourceId, importance, rate, status, implementorId, expirationInitial, expirationFinal, releaseInitial, releaseFinal} = searchQuery

        qb.where(new Brackets((qb) => {
            if (title) qb.where(`commission.title ilike :title`, {title: `%${title}%`})
            if (text) qb.andWhere(`commission.text ilike :text`, {text: `%${text}%`})
            if (level) qb.andWhere(`commission.level = :level`, {level})
            if (rate) qb.andWhere(`commission.rate = :rate`, {rate})
            if (importance) qb.andWhere(`commission.importance = :importance`, {importance})
            if (categoryId) qb.andWhere(`commission.categoryId = :categoryId`, {categoryId})
            if (sourceId) qb.andWhere(`commission.sourceId = :sourceId`, {sourceId})
            if (status) qb.andWhere('report.status = :status', {status})
            if (implementorId) qb.andWhere('report.userId = :userId', {userId: implementorId})

            if (expirationInitial && expirationFinal)
                qb.andWhere('commission.expiration >= :expirationInitial and commission.expiration <= :expirationFinal', {expirationInitial, expirationFinal})
            else if (expirationInitial && !expirationFinal)
                qb.andWhere('commission.expiration = :expiration', {expiration: expirationInitial})
            else if (!expirationInitial && expirationFinal)
                qb.andWhere('commission.expiration <= :expiration', {expiration: expirationFinal})

            if (releaseInitial && releaseFinal)
                qb.andWhere('commission.release >= :releaseInitial and commission.release <= :releaseFinal', {releaseInitial, releaseFinal})
            else if (releaseInitial && !releaseFinal)
                qb.andWhere('commission.release = :release', {release: releaseInitial})
            else if (!releaseInitial && releaseFinal)
                qb.andWhere('commission.release <= :release', {release: releaseFinal})
        }))

        return qb
    }

}
