import { Model } from "../../../../../core/database/entities/model"
import { IReport } from "../interfaces/report.interface"
import { Commission } from "../../../index/entities/Commission.entity"
import { User } from "../../../../users/entities/User.entity"
import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm"
import { ReportDocument } from "../../documents/entities/ReportDocument.entity"
import { Exclude } from "class-transformer";
import { ReportComment } from "../../comments/entities/ReportComment.entity";

export enum ReportStatus {
    WORK = 'work',
    EXPIRED = 'expired',
    DONE = 'done',
    RETURNED = 'returned',
    CONFIRMED = 'confirmed'
}

@Entity('commissions_reports')
export class Report extends Model implements IReport {

    @Column({length: 1000, nullable: true})
    title: string

    @Column({type: 'enum', enum: ReportStatus, default: ReportStatus.WORK})
    status: ReportStatus

    @Column({type: 'timestamp', nullable: true})
    confirmed: string

    @ManyToOne(() => User, user => user.reports, {eager: true})
    user: User

    @ManyToOne(() => Commission, commission => commission.reports)
    commission: Commission

    @OneToMany(() => ReportDocument, document => document.report, {eager: true, cascade: true})
    documents: ReportDocument[]

    @OneToMany(() => ReportComment, comment => comment.report, {eager: true, cascade: true})
    comments: ReportComment[]

    @RelationId((report: Report) => report.user)
    userId: number

    @RelationId((report: Report) => report.commission)
    commissionId: number

    locked = (): boolean => [ReportStatus.DONE, ReportStatus.CONFIRMED].includes(this.status)

    @Exclude({toPlainOnly: true})
    hasAccess = (userId: number): boolean => this.userId === userId

    @Exclude({toPlainOnly: true})
    canSendToVerification = (userId: number): boolean => this.userId === userId && !this.locked()

}
