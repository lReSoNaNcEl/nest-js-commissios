import { ICommissionsService } from "./interfaces/commissions-service.interface";
import { Injectable, Scope } from "@nestjs/common";
import { CommissionsRepository } from "./commissions.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../users/entities/User.entity";
import { CreateCommissionDto } from "./dto/create-commission.dto";
import { UsersRepository } from "../../users/users.repository";
import { Commission } from "./entities/Commission.entity";
import { runOnTransactionCommit, Transactional } from "typeorm-transactional-cls-hooked";
import { ReportsService } from "../reports/index/reports.service";
import { UsersLengthIsNullException } from "./filters/users-length-is-null.exception";
import { CategoriesService } from "../categories/categories.service";
import { SourcesService } from "../sources/sources.service";
import { Category } from "../categories/enitities/Category.entity";
import { Source } from "../sources/entities/Source.entity";
import { UpdateCommissionDto } from "./dto/update-commission.dto";
import { PaginationCommissionsQueryDto } from "./dto/pagination-commissions-query.dto";
import { SearchCommissionsQueryDto } from "./dto/search-commissions.query.dto";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";
import { LessThan } from "typeorm";

@Injectable()
export class CommissionsService implements ICommissionsService {

    constructor(
        @InjectRepository(CommissionsRepository)
        private commissionsRepository: CommissionsRepository,
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private categoriesService: CategoriesService,
        private sourcesService: SourcesService,
        private reportsService: ReportsService,
        private schedulerRegistry: SchedulerRegistry

    ) {}

    getCommission(commissionId: number): Promise<Commission> {
        return this.commissionsRepository.getCommission(commissionId)
    }

    getCommissions(paginationQuery: PaginationCommissionsQueryDto, searchQuery: SearchCommissionsQueryDto, user: User): Promise<[Commission[], number]> {
        return this.commissionsRepository.getCommissions(paginationQuery, searchQuery, user)
    }

    @Transactional()
    async createCommission(dto: CreateCommissionDto): Promise<Commission> {
        const {implementors, categoryId, sourceId} = dto
        const users = await this.usersRepository.getImplementorsByIds(implementors)

        if (!users.length) throw new UsersLengthIsNullException()

        let commission = this.commissionsRepository.create({...dto})

        if (categoryId) commission.category = await this.categoriesService.getCategory(categoryId)
        if (sourceId) commission.source = await this.sourcesService.getSource(sourceId)

        commission = await this.commissionsRepository.save(commission)
        commission.reports = await this.reportsService.createManyReports(users, commission.id)

        await runOnTransactionCommit(async () => await commission.save())

        return this.getCommission(commission.id)
    }

    @Cron(CronExpression.EVERY_SECOND)
    async test() {
        console.log('2');
    }

    async updateCommission(dto: UpdateCommissionDto, commissionId: number): Promise<Commission> {
        const commission = await this.commissionsRepository.getCommission(commissionId)
        const {categoryId, sourceId} = dto

        let category: Category = null
        let source: Source = null

        if (categoryId) category = await this.categoriesService.getCategory(categoryId)
        if (sourceId) source = await this.sourcesService.getSource(sourceId)

        await this.commissionsRepository.save({id: commission.id, ...dto, category, source})
        return this.commissionsRepository.getCommission(commissionId)
    }

}
