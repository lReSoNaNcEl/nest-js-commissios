import { ISource } from "../interfaces/source.interface";
import { Column, Entity } from "typeorm";
import { Commission } from "../../index/entities/Commission.entity";
import { Model } from "../../../../core/database/entities/model";

@Entity('commissions_sources')
export class Source extends Model implements ISource {

    @Column({unique: true})
    title: string

    commissions: Commission[]

}
