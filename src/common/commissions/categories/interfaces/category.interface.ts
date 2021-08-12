import { Commission } from "../../index/entities/Commission.entity";

export interface ICategory {
    title: string
    commissions: Commission[]
}
