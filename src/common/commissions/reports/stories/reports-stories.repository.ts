import { EntityRepository, Repository } from "typeorm";
import { ReportStory } from "./entities/ReportStory.entity";
import { IReportsStoriesRepository } from "./interfaces/reports-stories-repository.interface";

@EntityRepository(ReportStory)
export class ReportsStoriesRepository extends Repository<ReportStory> implements IReportsStoriesRepository {

}
