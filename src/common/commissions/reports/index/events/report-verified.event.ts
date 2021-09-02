import { User } from "../../../../users/entities/User.entity";
import { Report } from "../entities/Report.entity";

export class ReportVerifiedEvent {
    user: User
    report: Report
}
