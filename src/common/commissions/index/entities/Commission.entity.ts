import { Model } from "../../../../core/database/entities/model";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, RelationId } from "typeorm";
import { CommissionImportance, CommissionLevel, CommissionRate, ICommission } from "../interfaces/commission.interface";
import { Category } from "../../categories/enitities/Category.entity";
import { Source } from "../../sources/entities/Source.entity";
import { Report } from "../../reports/index/entities/Report.entity";
import { Transform } from "class-transformer";
import { CommissionDocument } from "../../documents/entities/CommissionDocument.entity";

@Entity('commissions')
export class Commission extends Model implements ICommission {

    @Column({length: 255})
    title: string

    @Column({length: 2000})
    text: string

    @Column({type: 'enum', enum: CommissionImportance, default: CommissionImportance.USUALLY})
    importance: CommissionImportance

    @Column({type: 'enum', enum: CommissionLevel, nullable: true})
    level: CommissionLevel

    @Column({type: 'enum', enum: CommissionRate, default: CommissionRate.ONCE})
    rate: CommissionRate

    @Column({nullable: true})
    registrationCardNumber: string

    @Column()
    positionNumber: string

    @Column({type: 'timestamp'})
    release: string

    @Column({type: 'timestamp'})
    expiration: string

    @Column({type: 'timestamp', nullable: true})
    registrationCardDate: string

    @Transform(({value}) => {
        if (value) return value.title
        return null
    })
    @JoinTable()
    @ManyToOne(() => Category, category => category.commissions)
    category: Category

    @Transform(({value}) => {
        if (value) return value.title
        return null
    })
    @JoinColumn()
    @ManyToOne(() => Source, source => source.commissions)
    source: Source

    @OneToMany(() => Report, report => report.commission)
    reports: Report[]

    @OneToMany(() => CommissionDocument, document => document.commission)
    documents: CommissionDocument[]

    @RelationId((commission: Commission) => commission.category)
    categoryId: number

    @RelationId((commission: Commission) => commission.source)
    sourceId: number

}
