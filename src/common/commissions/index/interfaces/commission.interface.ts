import {Category} from "../../categories/enitities/Category.entity";

export interface ICommission {
    title: string
    text: string
    category: Category
    importance: string
    level: string
    source: string
    number: string
    type: string
    rate: string
    expiration: string
}
