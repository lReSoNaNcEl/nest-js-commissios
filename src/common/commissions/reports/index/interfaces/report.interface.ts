import { User } from "../../../../users/entities/User.entity";
import { Commission } from "../../../index/entities/Commission.entity";
import { ReportStatus } from "../entities/Report.entity";
import { ReportDocument } from "../../documents/entities/ReportDocument.entity";
import { ReportComment } from "../../comments/entities/ReportComment.entity";
import { ReportStory } from "../../stories/entities/ReportStory.entity";

export interface IReport {
    title: string
    status: ReportStatus
    user: User
    commission: Commission
    documents: ReportDocument[]
    comments: ReportComment[]
    stories: ReportStory[]
    confirmed: string
    canSendToVerification(userId: number): boolean
    locked(): boolean
}
