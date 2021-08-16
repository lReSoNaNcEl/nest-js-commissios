import { Report } from "../../commissions/reports/index/entities/Report.entity";

export enum Roles {
    IMPLEMENTOR = 'implementor',
    ADMIN = 'admin'
}

export interface IUser {
    id: number
    email: string
    password: string
    name: string
    role: Roles
    reports: Report[]
}
