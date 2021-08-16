import { ICommissionsService } from "./interfaces/commissions-service.interface";
import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
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
import { ReportsRepository } from "../reports/index/reports.repository";
import { ModuleRef } from "@nestjs/core";

@Injectable()
export class CommissionsService implements ICommissionsService {

    constructor(
        @InjectRepository(CommissionsRepository)
        private commissionsRepository: CommissionsRepository,
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        // @InjectRepository(ReportsRepository)
        // private reportsRepository: ReportsRepository,
        // @Inject(forwardRef(() => ReportsService))
        private reportsService: ReportsService
    ) {}

    @Transactional()
    async createCommission(dto: CreateCommissionDto) {
        const {implementors} = dto

        const users = await this.usersRepository.getImplementorsByIds(implementors)

        let commission = this.commissionsRepository.create(dto)
        commission = await this.commissionsRepository.save(commission)

        // const reports = await Promise.all(users.map(async user => {
        //     const report = this.
        // }))

        console.log(commission)

        runOnTransactionCommit(() => console.log('transactionSuccess'))

        return commission

        console.log(dto, 'test')

        // const {categoryId, sourceId} = dto
        return <any>{}
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
