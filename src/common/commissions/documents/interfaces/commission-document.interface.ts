import { IFile } from "../../../files/interfaces/file.interface"
import { Commission } from "../../index/entities/Commission.entity"

export interface ICommissionDocument extends IFile {
    commission: Commission
}
