import {OnEvent} from "@nestjs/event-emitter"
import { Injectable } from "@nestjs/common";
import { ReportVerifiedEvent } from "../events/report-verified.event"
import { ReportsStoriesService } from "../../stories/reports-stories.service";


@Injectable()
export class ReportVerifiedListener {

    constructor(
        private reportsStoriesService: ReportsStoriesService
    ) {}

    @OnEvent('report.verified')
    async handleReportVerifiedEvent(event: ReportVerifiedEvent) {
        const {report, user} = event
        await this.reportsStoriesService.createStory(report, user)
    }

}
