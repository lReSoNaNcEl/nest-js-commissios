import { Injectable } from "@nestjs/common";
import { Cron, CronExpression, SchedulerRegistry } from "@nestjs/schedule";
import { In, LessThan } from "typeorm";
import { CommissionsRepository } from "./commissions.repository";
import { ReportsRepository } from "../reports/index/reports.repository";
import { ReportStatus } from "../reports/index/entities/Report.entity";
import { ICommissionsCronService } from "./interfaces/commissions-cron-service.interface";
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class CommissionsCronService implements ICommissionsCronService {

    constructor(
        private schedulerRegistry: SchedulerRegistry,
        private commissionsRepository: CommissionsRepository,
        private reportsRepository: ReportsRepository,
        private eventEmitter: EventEmitter2
    ) {
    }

    @Cron(CronExpression.EVERY_10_MINUTES)
    async handleExpiredCommissions(): Promise<void> {
        const reports = await this.reportsRepository.find({
            where: {
                status: In([ReportStatus.WORK, ReportStatus.RETURNED]),
                commission: {
                    expiration: LessThan(new Date().toISOString())
                }
            },
            relations: ['commission']
        })

        // await Promise.all(reports.map(report => this.reportsRepository.update(report.id, {status: ReportStatus.EXPIRED})))
        await this.reportsRepository.update(reports.map(report => report.id), {status: ReportStatus.EXPIRED})
    }

    @Cron(CronExpression.EVERY_SECOND)
    async test() {
        console.log('sdfs');
        this.eventEmitter.emit('commissions-cron-creating')
    }

}
