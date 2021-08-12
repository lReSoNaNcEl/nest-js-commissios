import { Model } from "../../../../core/database/entities/model";
import { Column, Entity, ManyToOne } from "typeorm";
import { ICommission } from "../interfaces/commission.interface";
import { Category } from "../../categories/enitities/Category.entity";

@Entity('commissions')
export class Commission extends Model implements ICommission {

    @Column()
    title: string

    @Column()
    text: string

    @ManyToOne(() => Category, category => category.commissions)
    category: Category

    @Column()
    expiration: string

    @Column()
    importance: string

    @Column()
    level: string

    @Column()
    number: string

    @Column()
    rate: string

    @Column()
    source: string

    @Column()
    type: string

}
