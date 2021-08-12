import { Model } from "../../../../core/database/entities/model";
import { ICategory } from "../interfaces/category.interface";
import { Column, Entity, OneToMany } from "typeorm";
import { Commission } from "../../index/entities/Commission.entity";

@Entity('commissions_categories')
export class Category extends Model implements ICategory {

    @Column({unique: true})
    title: string

    @OneToMany(() => Commission, commission => commission.category)
    commissions: Commission[]

}
