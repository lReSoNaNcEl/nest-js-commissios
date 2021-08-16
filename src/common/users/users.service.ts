import {IUsersService} from './interfaces/users-service.interface'
import {Injectable, NotFoundException} from '@nestjs/common'
import {User} from './entities/User.entity'
import {InjectRepository} from '@nestjs/typeorm'
import {UsersRepository} from './users.repository'
import { AuthSignupDto } from "../auth/dto/auth-signup.dto";
import { Roles } from "./interfaces/user.interface";

@Injectable()
export class UsersService implements IUsersService {

    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) {}

    createUser(dto: AuthSignupDto): Promise<User> {
        const user = this.usersRepository.create(dto)
        return this.usersRepository.save(user)
    }

    async getUser(userId: number): Promise<User> {
        const user = await this.usersRepository.getUser(userId)
        if (!user) throw new NotFoundException(`User with ID ${userId} not found!`)
        return user
    }

    getUsersByRole(role: Roles): Promise<User[]> {
        return this.usersRepository.getUsersByRole(role)
    }

}
