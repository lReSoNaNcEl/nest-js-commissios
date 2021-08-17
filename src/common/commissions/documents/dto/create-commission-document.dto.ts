import { IFile } from "../../../files/interfaces/file.interface";
import { Commission } from "../../index/entities/Commission.entity";

export class CreateCommissionDocumentDto implements IFile {
    filename: string
    mimetype: string
    originalName: string
    path: string
    size: number
    url: string
    commission: Commission
}
