import { EntityRepository, Repository } from "typeorm";
import { Report } from "./entities/Report.entity";
import { IReportsRepository } from "./interfaces/reports-repository.interface";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Report)
export class ReportsRepository extends Repository<Report> implements IReportsRepository {

    async getReport(reportId: number): Promise<Report> {
        const report = await this.findOne({where: {id: reportId}})
        if (!report) throw new NotFoundException(`Report with ID ${reportId} don\`t exists`)
        return report
    }
}
