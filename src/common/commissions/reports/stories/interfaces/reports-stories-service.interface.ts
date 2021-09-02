import { Report } from "../../index/entities/Report.entity";
import { User } from "../../../../users/entities/User.entity";
import { ReportStory } from "../entities/ReportStory.entity";

export interface IReportsStoriesService {
    createStory: (report: Report, user: User) => Promise<ReportStory>
}
