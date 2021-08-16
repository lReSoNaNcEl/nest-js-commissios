import {User} from '../entities/User.entity'
import { Roles } from "./user.interface";

export interface IUsersRepository {
    getUser: (userId: number) => Promise<User>
    getUserByEmail: (email: string) => Promise<User>
    getUsersByRole: (role: Roles) => Promise<User[]>
    getImplementorsByIds: (ids: number[]) => Promise<User[]>
}
