import {Model} from '../../../core/database/entities/model'
import {Column, Entity, OneToMany, BeforeInsert} from 'typeorm'
import {Exclude} from 'class-transformer'
import { IUser, Roles } from "../interfaces/user.interface";
import * as bcrypt from 'bcrypt'
import { Report } from 'src/common/commissions/reports/index/entities/Report.entity';
import { ReportComment } from "../../commissions/reports/comments/entities/ReportComment.entity";

@Entity("users")
export class User extends Model implements IUser {

    @Column({unique: true, length: 255})
    email: string

    @Exclude({toPlainOnly: true})
    @Column()
    password: string

    @Column()
    name: string

    @Column({type: 'enum', enum: Roles, default: Roles.IMPLEMENTOR})
    role: Roles

    @OneToMany(() => Report, report => report.user)
    reports: Report[]

    @OneToMany(() => ReportComment, comment => comment.author)
    reportsComments: ReportComment[]

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
    }
}
