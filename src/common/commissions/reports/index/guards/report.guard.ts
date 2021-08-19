import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { getRepository, Repository } from "typeorm";
import { Report } from "../entities/Report.entity";
import { ReportDoesNotBelongUser } from "../filters/report-does-not-belong-user";
@Injectable()
export class ReportGuard implements CanActivate {

    async canActivate(
        ctx: ExecutionContext,
    ): Promise<boolean> {
        const req = ctx.switchToHttp().getRequest()
        const {reportId} = req.params
        const user = req.user

        const reportsRepository: Repository<Report> = getRepository(Report)
        const report: Report = await reportsRepository.findOne({where: {id: reportId}})

        if (!report.hasAccess(user.id))
            throw new ReportDoesNotBelongUser()

        return true
    }

}
