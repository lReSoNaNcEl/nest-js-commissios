import { Model } from "../../../../../core/database/entities/model";
import { IReport } from "../interfaces/report.interface";
import { Commission } from "../../../index/entities/Commission.entity";
import { User } from "../../../../users/entities/User.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";

export enum ReportStatus {
    WORK = 'work',
    EXPIRED = 'expired',
    DONE = 'done'
}

@Entity('commissions_reports')
export class Report extends Model implements IReport {

    @Column({length: 1000, nullable: true})
    title: string

    @Column({type: 'enum', enum: ReportStatus, default: ReportStatus.WORK})
    status: ReportStatus

    @Column({type: 'timestamp', nullable: true})
    confirmed: string

    document: any

    @ManyToOne(() => User, user => user.reports)
    user: User

    @ManyToOne(() => Commission, commission => commission.reports)
    commission: Commission

    @RelationId((report: Report) => report.user)
    userId: number

    @RelationId((report: Report) => report.user)
    commissionId: number


}
