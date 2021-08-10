import {IUsersService} from './interfaces/users-service.interface'
import {Injectable, NotFoundException} from '@nestjs/common'
import {User} from './entities/User.entity'
import {InjectRepository} from '@nestjs/typeorm'
import {UsersRepository} from './users.repository'
import {IAuthCredentials} from '../auth/interfaces/auth-credentials.interface'

@Injectable()
export class UsersService implements IUsersService {

    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) {}

    createUser(credentials: IAuthCredentials): Promise<User> {
        const user = this.usersRepository.create(credentials)
        return this.usersRepository.save(user)
    }

    async getUser(userId: number): Promise<User> {
        const user = await this.usersRepository.getUser(userId)
        if (!user) throw new NotFoundException(`Пользователя с идентификатором ${userId} не существует`)
        return user
    }

}
