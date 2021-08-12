import {Model} from '../../../core/database/entities/model'
import {Column, Entity, JoinColumn, OneToMany, OneToOne, BeforeInsert} from 'typeorm'
import {Exclude} from 'class-transformer'
import {IUser} from '../interfaces/user.interface'
import * as bcrypt from 'bcrypt'

@Entity('users')
export class User extends Model implements IUser {

    @Column({unique: true, length: 20})
    email: string

    @Exclude({toPlainOnly: true})
    @Column()
    password: string

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
    }

}
