import { Column, Entity, ManyToOne } from "typeorm";
import { ICommissionDocument } from "../interfaces/commission-document.interface";
import { Commission } from "../../index/entities/Commission.entity";
import { Model } from "../../../../core/database/entities/model";

@Entity('commissions_documents')
export class CommissionDocument extends Model implements ICommissionDocument {

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

    @ManyToOne(() => Commission, () => commission => commission.documents)
    commission: Commission

}
