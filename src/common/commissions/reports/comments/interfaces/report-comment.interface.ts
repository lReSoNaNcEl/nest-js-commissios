import { User } from "../../../../users/entities/User.entity";
import { Report } from "../../index/entities/Report.entity";

export interface IReportComment {
    title: string
    report: Report,
    author: User
    hasAuthor: (userId: number) => boolean
}
