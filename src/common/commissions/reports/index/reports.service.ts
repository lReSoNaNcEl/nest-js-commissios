import { forwardRef, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ReportsRepository } from "./reports.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { IReportsService } from "./interfaces/reports-service.interface";
import { CreateReportDto } from "./dto/create-report.dto";
import { Report, ReportStatus } from "./entities/Report.entity";
import { UsersService } from "../../../users/users.service";
import { CommissionsService } from "../../index/commissions.service";
import { ModuleRef } from "@nestjs/core";
import { User } from "../../../users/entities/User.entity";
import { VerifyReportDto } from "./dto/verify-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { FilesService } from "../../../files/files.service";

@Injectable()
export class ReportsService implements IReportsService {

    constructor(
        @InjectRepository(ReportsRepository)
        private reportsRepository: ReportsRepository,
        private usersService: UsersService,
        private moduleRef: ModuleRef,
        private filesService: FilesService,
        @Inject(forwardRef(() => CommissionsService))
        private commissionsService: CommissionsService
    ) {
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

    async sendReportToReview(reportId: number): Promise<Report> {
        const report = await this.reportsRepository.getReport(reportId)
        return this.reportsRepository.save({
            id: report.id,
            status: ReportStatus.DONE,
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
        await this.reportsRepository.save({id: report.id, title})
        return  this.reportsRepository.getReport(reportId)
    }

    async deleteReport(reportId: number): Promise<any> {
        const report = await this.reportsRepository.getReport(reportId)
        report.documents.map(document => this.filesService.removeFile(document.path))
        return  this.reportsRepository.delete(report.id)
    }

}
