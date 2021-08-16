import { EntityRepository, Repository } from "typeorm";
import { Report } from "./entities/Report.entity";
import { IReportsRepository } from "./interfaces/reports-repository.interface";

@EntityRepository(Report)
export class ReportsRepository extends Repository<Report> implements IReportsRepository {

}
