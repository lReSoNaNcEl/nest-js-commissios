import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { IReportDocument } from "../interfaces/report-document.interface";
import {Model} from "../../../../../core/database/entities/model";
import { Report } from "../../index/entities/Report.entity";

@Entity('reports_documents')
export class ReportDocument extends Model implements IReportDocument {

    @Column()
    filename: string

    @Column()
    mimetype: string

    @Column()
    originalName: string

    @Column()
    path: string

    @Column({type: 'bigint'})
    size: number

    @Column()
    url: string

    @ManyToOne(() => Report, report => report.documents, {
        onDelete: 'CASCADE',
    })
    report: Report

    @RelationId((document: ReportDocument) => document.report)
    reportId: number

}
