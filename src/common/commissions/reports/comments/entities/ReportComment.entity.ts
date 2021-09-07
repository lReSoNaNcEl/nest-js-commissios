import {Model} from "../../../../../core/database/entities/model"
import { Column, Entity,  ManyToOne, RelationId } from 'typeorm';
import {IReportComment} from '../interfaces/report-comment.interface'
import { User } from "../../../../users/entities/User.entity";
import { Report } from "../../index/entities/Report.entity"

@Entity('reports_comments')
export class ReportComment extends Model implements IReportComment {

    @Column()
    title: string

    @ManyToOne(() => User, user => user.reportsComments, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    author: User

    @ManyToOne(() => Report, report => report.comments, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    report: Report

    @RelationId((comment: ReportComment) => comment.report)
    reportId: number

    hasAuthor(userId: number): boolean {
        return this.author.id === userId
    }

}
