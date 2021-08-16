import { ICommissionsService } from "./interfaces/commissions-service.interface";
import { forwardRef, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { CommissionsRepository } from "./commissions.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { cache } from "../../../main";
import { Cache } from "../../../core/cache";
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

    @Transactional()
    async createCommission(dto: CreateCommissionDto) {
        const {implementors, categoryId, sourceId} = dto
        const users = await this.usersRepository.getImplementorsByIds(implementors)

        if (!users.length) throw new UsersLengthIsNullException()
        const category: Category = await this.categoriesService.getCategory(categoryId)
        const source: Source = await this.sourcesService.getSource(sourceId)

        let commission = this.commissionsRepository.create({...dto, category, source})
        commission = await this.commissionsRepository.save(commission)
        commission.reports = await this.reportsService.createManyReports(users, commission.id)

        await runOnTransactionCommit(async () => commission.save())

        return this.getCommission(commission.id)
    }

    getCommission(commissionId: number): Promise<Commission> {
        return this.commissionsRepository.getCommission(commissionId)
    }

    getCommissions(): Promise<any> {
        const user: User = cache.get(Cache.CURRENT_USER)

        console.log(user)

        switch (user.role) {
            case Roles.ADMIN: {
                return this.commissionsRepository.getCommissionsOfAdmin()
            }
            case Roles.IMPLEMENTOR: {
                return  this.commissionsRepository.getCommissionsOfImplementor(user.id)
            }
        }

    }

}
