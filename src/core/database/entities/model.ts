import {CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity} from 'typeorm'
import {classToPlain} from 'class-transformer'

@Entity()
export class Model extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({type: 'timestamp'})
    created: Date

    @UpdateDateColumn({type: 'timestamp'})
    updated: Date

    toJSON() {
        return classToPlain(this)
    }

}
