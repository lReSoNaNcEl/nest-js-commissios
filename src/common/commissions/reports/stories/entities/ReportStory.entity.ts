import { Model } from "../../../../../core/database/entities/model";
import { IReportStory } from "../interfaces/report-story.interface";
import { ReportComment } from "../../comments/entities/ReportComment.entity";
import { ReportDocument } from "../../documents/entities/ReportDocument.entity";
import { User } from "../../../../users/entities/User.entity";
import { Report } from "../../index/entities/Report.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, RelationId } from "typeorm";

@Entity('reports_stories')
export class ReportStory extends Model implements IReportStory {

    @Column({length: 1000})
    title: string

    @ManyToMany(() => ReportComment, {eager: true})
    @JoinTable()
    comments: ReportComment[]

    @ManyToMany(() => ReportDocument, {eager: true})
    @JoinTable()
    documents: ReportDocument[]

    @ManyToOne(() => User, {eager: true})
    inspector: User

    @ManyToOne(() => Report, report => report.stories, {onDelete: 'CASCADE'})
    report: Report

    @RelationId((story: ReportStory) => story.report)
    reportId: number

}
