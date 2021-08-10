import {User} from '../entities/User.entity'

export interface IUsersService {

    getUser: (userId: number) => Promise<User>

}
