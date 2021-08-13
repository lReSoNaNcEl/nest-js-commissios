import { ISource } from "../interfaces/source.interface";
import { Column, Entity, OneToMany } from "typeorm";
import { Commission } from "../../index/entities/Commission.entity";
import { Model } from "../../../../core/database/entities/model";

@Entity('commissions_sources')
export class Source extends Model implements ISource {

    @Column({unique: true})
    title: string

    @OneToMany(() => Commission, commission => commission.source)
    commissions: Commission[]

}
