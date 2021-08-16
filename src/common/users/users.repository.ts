import {EntityRepository, Repository} from 'typeorm'
import {User} from './entities/User.entity'
import {IUsersRepository} from './interfaces/users-repository.interface'
import { Roles } from "./interfaces/user.interface";

@EntityRepository(User)
export class UsersRepository extends Repository<User> implements IUsersRepository {

    getUser(userId: number) {
        return this.findOne({where: {id: userId}})
    }

    getUserByEmail(email: string) {
        return this.findOne({where: {email}})
    }

    getUsersByRole(role: Roles) {
        return this.find({where: {role}})
    }

    getImplementorsByIds(ids: number[]) {
        return this.findByIds(ids, {where: {role: Roles.IMPLEMENTOR}})
    }

}
