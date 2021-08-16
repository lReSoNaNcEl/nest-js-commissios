import {User} from '../entities/User.entity'
import { Roles } from "./user.interface";

export interface IUsersService {
    getUser: (userId: number) => Promise<User>
}
