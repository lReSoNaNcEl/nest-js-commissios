import {IFile} from "../../../../files/interfaces/file.interface";
import { Report } from "../../index/entities/Report.entity";

export class CreateReportDocumentDto implements IFile {
    filename: string
    mimetype: string
    originalName: string
    path: string
    size: number
    url: string
    report: Report
}
