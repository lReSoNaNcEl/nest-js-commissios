import { Injectable, OnModuleInit } from "@nestjs/common";
import { ReportsRepository } from "./reports.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { IReportsService } from "./interfaces/reports-service.interface";
import { CreateReportDto } from "./dto/create-report.dto";
import { Report, ReportStatus } from "./entities/Report.entity";
import { UsersService } from "../../../users/users.service";
import { CommissionsService } from "../../index/commissions.service";
import { ModuleRef } from "@nestjs/core";
import { User } from "../../../users/entities/User.entity";
import { ReviewReportDto } from "./dto/review-report.dto";
import { VerifyReportDto } from "./dto/verify-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";

@Injectable()
export class ReportsService implements IReportsService, OnModuleInit {

    private commissionsService: CommissionsService;

    constructor(
        @InjectRepository(ReportsRepository)
        private reportsRepository: ReportsRepository,
        private usersService: UsersService,
        private moduleRef: ModuleRef
    ) {
    }

    //@@@ Импорт сервиса через хук нужен, чтобы не происходило циклических зависимостей - https://docs.nestjs.com/fundamentals/circular-dependency
    onModuleInit() {
        this.commissionsService = this.moduleRef.get<CommissionsService>(CommissionsService)
    }

    async getReport(reportId: number): Promise<Report> {
        return this.reportsRepository.getReport(reportId)
    }

    async createReport(dto: CreateReportDto): Promise<Report> {
        const {userId, commissionId} = dto

        const commission = await this.commissionsService.getCommission(commissionId)
        const user = await this.usersService.getUser(userId)
        const report = this.reportsRepository.create({user, commission})

        return this.reportsRepository.save(report)
    }

    async createManyReports(users: User[], commissionId: number): Promise<Report[]> {
        return Promise.all(await users.map(({id}) => {
            const dto = <CreateReportDto>{userId: id, commissionId}
            return this.createReport(dto)
        }))
    }

    async sendReportToReview(dto: ReviewReportDto, reportId: number): Promise<Report> {
        const report = await this.reportsRepository.getReport(reportId)
        return this.reportsRepository.save({
            id: report.id,
            status: ReportStatus.DONE,
            ...dto
        })
    }

    async verifyReport(dto: VerifyReportDto, reportId: number): Promise<Report> {
        const {status} = dto
        const report = await this.reportsRepository.getReport(reportId)
        return this.reportsRepository.save({
            id: report.id,
            status,
            confirmed: status === ReportStatus.CONFIRMED ? new Date().toISOString() : null
        })
    }

    async updateReport(dto: UpdateReportDto, reportId: number): Promise<Report> {
        const {title} = dto
        const report = await this.reportsRepository.getReport(reportId)
        return this.reportsRepository.save({id: report.id, title})
    }

}
