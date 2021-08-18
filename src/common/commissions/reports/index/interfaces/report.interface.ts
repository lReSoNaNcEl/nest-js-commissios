import { User } from "../../../../users/entities/User.entity";
import { Commission } from "../../../index/entities/Commission.entity";
import { ReportStatus } from "../entities/Report.entity";
import { ReportDocument } from "../../documents/entities/ReportDocument.entity";

export interface IReport {
    title: string
    status: ReportStatus
    user: User
    commission: Commission
    documents: ReportDocument[]
    confirmed: string
    freeze: boolean
}
