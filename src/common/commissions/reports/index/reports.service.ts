import { forwardRef, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ReportsRepository } from "./reports.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { IReportsService } from "./interfaces/reports-service.interface";
import { CreateReportDto } from "./dto/create-report.dto";
import { Report } from "./entities/Report.entity";
import { UsersService } from "../../../users/users.service";
import { CommissionsService } from "../../index/commissions.service";
import { ModuleRef } from "@nestjs/core";

@Injectable()
export class ReportsService implements IReportsService, OnModuleInit {

    commissionsService: CommissionsService

    constructor(
        @InjectRepository(ReportsRepository)
        private reportsRepository: ReportsRepository,
        private usersService: UsersService,
        private moduleRef: ModuleRef
    ) {}

    //@@@ Импорт сервиса через хук нужен, чтобы не происходило циклических зависимостей - https://docs.nestjs.com/fundamentals/circular-dependency
    onModuleInit() {
        this.commissionsService = this.moduleRef.get(CommissionsService)
    }

    async createReport(dto: CreateReportDto): Promise<Report> {
        const {userId, commissionId} = dto

        const commission = await this.commissionsService.getCommission(commissionId)
        const user = await this.usersService.getUser(userId)
        const report = this.reportsRepository.create({user, commission})

        return this.reportsRepository.save(report)
    }

}
