import {Category} from "../../categories/enitities/Category.entity";
import { Source } from "../../sources/entities/Source.entity"
import { CommissionDocument } from "../../documents/entities/CommissionDocument.entity";

export enum  CommissionImportance {
    IMPORTANT = 'important',
    USUALLY = 'usually',
    CRITICAL = 'critical'
}

export enum CommissionLevel {
    FEDERAL = 'federal',
    REGIONAL = 'regional'
}

export enum CommissionRate {
    ONCE = 'once'
}

export interface ICommission {
    title: string
    text: string
    importance: CommissionImportance
    level: CommissionLevel
    rate: CommissionRate
    expiration: string
    category: Category
    source: Source
    documents: CommissionDocument[]
    release: string
    registrationCardDate: string
    registrationCardNumber: string
    positionNumber: string
    categoryId: number
    sourceId: number
}
