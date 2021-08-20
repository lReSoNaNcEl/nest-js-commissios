import { User } from "../entities/User.entity";

export interface IUsersController {
    getImplementors(): Promise<User[]>
}
