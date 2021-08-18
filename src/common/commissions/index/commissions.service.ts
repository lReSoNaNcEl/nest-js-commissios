import { ICommissionsService } from "./interfaces/commissions-service.interface";
import { Injectable } from "@nestjs/common";
import { CommissionsRepository } from "./commissions.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../users/entities/User.entity";
import { Roles } from "../../users/interfaces/user.interface";
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

    ) {}

    getCommission(commissionId: number): Promise<Commission> {
        return this.commissionsRepository.getCommission(commissionId)
    }

    getCommissions(query: PaginationCommissionsQueryDto, user: User): Promise<Commission[]> {
        return this.commissionsRepository.getCommissions(query, user)
    }

    @Transactional()
    async createCommission(dto: CreateCommissionDto): Promise<Commission> {
        const {implementors, categoryId, sourceId} = dto
        const users = await this.usersRepository.getImplementorsByIds(implementors)

        if (!users.length) throw new UsersLengthIsNullException()
        const category: Category = await this.categoriesService.getCategory(categoryId)
        const source: Source = await this.sourcesService.getSource(sourceId)

        let commission = this.commissionsRepository.create({...dto, category, source})
        commission = await this.commissionsRepository.save(commission)
        commission.reports = await this.reportsService.createManyReports(users, commission.id)

        await runOnTransactionCommit(async () => await commission.save())

        return this.getCommission(commission.id)
    }

    async updateCommission(dto: UpdateCommissionDto, commissionId: number): Promise<Commission> {
        const commission = await this.commissionsRepository.getCommission(commissionId)
        const {categoryId, sourceId} = dto
        const category: Category = await this.categoriesService.getCategory(categoryId)
        const source: Source = await this.sourcesService.getSource(sourceId)

        await this.commissionsRepository.save({id: commission.id, ...dto, category, source})
        return this.commissionsRepository.getCommission(commissionId)
    }

}
