import { User } from "../entities/User.entity"
import { Request } from "express"

export interface IUsersController {
    getImplementors(): Promise<User[]>
    getMe(req: Request): User
}
