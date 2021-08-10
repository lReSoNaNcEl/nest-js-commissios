import {EntityRepository, Repository} from 'typeorm'
import {User} from './entities/User.entity'
import {IUsersRepository} from './interfaces/users-repository.interface'

@EntityRepository(User)
export class UsersRepository extends Repository<User> implements IUsersRepository {

    getUser(userId: number) {
        return this.findOne({where: {id: userId}})
    }

    getUserByEmail(email: string) {
        return this.findOne({where: {email}})
    }

}
