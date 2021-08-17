import {IFile} from "../../../../files/interfaces/file.interface"
import {Report} from "../../index/entities/Report.entity";

export interface IReportDocument extends IFile {
    report: Report
}
