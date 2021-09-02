import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { ReportsRepository } from "./reports.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { IReportsService } from "./interfaces/reports-service.interface";
import { CreateReportDto } from "./dto/create-report.dto";
import { Report, ReportStatus } from "./entities/Report.entity";
import { UsersService } from "../../../users/users.service";
import { CommissionsService } from "../../index/commissions.service";
import { ModuleRef, REQUEST } from "@nestjs/core";
import { User } from "../../../users/entities/User.entity";
import { VerifyReportDto } from "./dto/verify-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { FilesService } from "../../../files/files.service";
import { Roles } from "../../../users/interfaces/user.interface";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ReportVerifiedEvent } from "./events/report-verified.event";
import { Request } from "express";

@Injectable({scope: Scope.REQUEST})
export class ReportsService implements IReportsService {

    constructor(
        @InjectRepository(ReportsRepository)
        private reportsRepository: ReportsRepository,
        private usersService: UsersService,
        private moduleRef: ModuleRef,
        private filesService: FilesService,
        @Inject(forwardRef(() => CommissionsService))
        private commissionsService: CommissionsService,
        private eventEmitter: EventEmitter2,
        @Inject(REQUEST)
        private req: Request
    ) {
    }

    async getReport(reportId: number): Promise<Report> {
        return this.reportsRepository.getReport(reportId)
    }

    async createReport(dto: CreateReportDto): Promise<Report> {
        const {userId, commissionId} = dto
        const commission = await this.commissionsService.getCommission(commissionId)
        const user = await this.usersService.getUser(userId)

        if (commission.reports.some(r => r.userId === userId))
            throw new HttpException(`You can\`t re-create a report for a user inside an commission ${commissionId}`, HttpStatus.CONFLICT)

        if (user.role === Roles.ADMIN)
            throw new HttpException('You can\'t assign a report to an administrator', HttpStatus.BAD_REQUEST)

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

        if (!report.title)
            throw new HttpException(`You can't send an incomplete report`, HttpStatus.FORBIDDEN)

        return this.reportsRepository.save({
            id: report.id,
            status: ReportStatus.DONE,
        })
    }

    async verifyReport(dto: VerifyReportDto, reportId: number): Promise<Report> {
        const {status} = dto
        const report = await this.reportsRepository.getReport(reportId)

        if (report.status !== ReportStatus.DONE)
            throw new HttpException(`You can't check an incomplete report`, HttpStatus.FORBIDDEN)

        if ([ReportStatus.RETURNED].includes(status)) {
            const user: User = this.req.user
            const event = new ReportVerifiedEvent()
            event.user = user
            event.report = report
            this.eventEmitter.emit('report.verified', <ReportVerifiedEvent>event)
        }

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
