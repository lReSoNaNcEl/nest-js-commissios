import {User} from '../entities/User.entity'

export interface IUsersRepository {
    getUser: (userId: number) => Promise<User>
    getUserByEmail: (email: string) => Promise<User>
}
