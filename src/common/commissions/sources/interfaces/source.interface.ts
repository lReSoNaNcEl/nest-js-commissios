import { Commission } from "../../index/entities/Commission.entity"

export interface ISource {
    title: string
    commissions: Commission[]
}
