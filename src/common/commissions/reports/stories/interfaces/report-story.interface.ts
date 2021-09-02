import { User } from "../../../../users/entities/User.entity";
import { Report } from "../../index/entities/Report.entity";
import { ReportDocument } from "../../documents/entities/ReportDocument.entity";
import { ReportComment } from "../../comments/entities/ReportComment.entity";

export interface IReportStory {
    title: string
    report: Report
    inspector: User
    documents: ReportDocument[]
    comments: ReportComment[]
}
