import { Injectable } from "@nestjs/common";
import { IReportsStoriesService } from "./interfaces/reports-stories-service.interface";
import { ReportsStoriesRepository } from "./reports-stories.repository";
import { Report } from "../index/entities/Report.entity";
import { User } from "../../../users/entities/User.entity";
import { ReportStory } from "./entities/ReportStory.entity";

@Injectable()
export class ReportsStoriesService implements IReportsStoriesService {

    constructor(
        private reportsStoriesRepository: ReportsStoriesRepository
    ) {}

    createStory(report: Report, user: User): Promise<ReportStory> {
        const {title, comments, documents} = report
        const story = this.reportsStoriesRepository.create({title, documents, comments, inspector: user})
        story.report = report

        return this.reportsStoriesRepository.save(story)
    }

}
