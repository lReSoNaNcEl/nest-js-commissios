import {Category} from "../../categories/enitities/Category.entity";
import { Source } from "../../sources/entities/Source.entity"
import { CommissionDocument } from "../../documents/entities/CommissionDocument.entity";

//Важность
export enum  CommissionImportance {
    IMPORTANT = 'important',
    USUALLY = 'usually',
    CRITICAL = 'critical'
}

//Уровень
export enum CommissionLevel {
    FEDERAL = 'federal',
    REGIONAL = 'regional'
}

//Периодичность
export enum CommissionRate {
    ONCE = 'once', //единичное
    EVERY_DAY = 'everyDay', // каждый день
    EVERY_WEEK = 'everyWeek', //каждую неделю
    ONCE_EVERY_TWO_WEEK = 'onceEveryTwoWeek', //раз в две недели
    EVERY_MONTH = 'everyMonth', //каждый месяц
    EVERY_QUARTER = 'everyQuarter', //ежеквартально
    ONCE_EVERY_HALF_YEAR = 'onceEveryHalfYear', //каждые пол года
    EVERY_YEAR = 'everyYear' //каждый год
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
    documentNumber: string
    positionNumber: string
    categoryId: number
    sourceId: number
}
