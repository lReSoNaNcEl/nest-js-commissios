import { Injectable, CanActivate, ExecutionContext, UseGuards, Inject } from "@nestjs/common";
import { getRepository, Repository } from "typeorm";
import { Report } from "../entities/Report.entity";
import { HasNotAccessSendReportToReviewException } from "../filters/has-not-access-send-report-to-review.exception";
@Injectable()
export class ReportReviewGuard implements CanActivate {

    async canActivate(
        ctx: ExecutionContext,
    ): Promise<boolean> {
        const req = ctx.switchToHttp().getRequest()
        const {reportId} = req.params
        const user = req.user

        const reportsRepository: Repository<Report> = getRepository(Report)
        const report: Report = await reportsRepository.findOne({where: {id: reportId}})

        if (!report.hasVerificationRights(user.id))
            throw new HasNotAccessSendReportToReviewException()

        return true
    }

}
