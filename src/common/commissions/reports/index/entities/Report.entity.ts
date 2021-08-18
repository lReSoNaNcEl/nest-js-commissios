import { Model } from "../../../../../core/database/entities/model";
import { IReport } from "../interfaces/report.interface";
import { Commission } from "../../../index/entities/Commission.entity";
import { User } from "../../../../users/entities/User.entity";
import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm";
import { ReportDocument } from "../../documents/entities/ReportDocument.entity";

export enum ReportStatus {
    WORK = 'work',
    EXPIRED = 'expired',
    DONE = 'done',
    RETURNED = 'returned'
}

@Entity('commissions_reports')
export class Report extends Model implements IReport {

    @Column({length: 1000, nullable: true})
    title: string

    @Column({type: 'enum', enum: ReportStatus, default: ReportStatus.WORK})
    status: ReportStatus

    @Column({type: 'timestamp', nullable: true})
    confirmed: string

    @ManyToOne(() => User, user => user.reports)
    user: User

    @Column({type: 'boolean', default: false})
    freeze: boolean

    @ManyToOne(() => Commission, commission => commission.reports)
    commission: Commission

    @OneToMany(() => ReportDocument, document => document.report)
    documents: ReportDocument[]

    @RelationId((report: Report) => report.user)
    userId: number

    @RelationId((report: Report) => report.commission)
    commissionId: number

}
