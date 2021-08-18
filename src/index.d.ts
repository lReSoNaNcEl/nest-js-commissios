import { User } from "./common/users/entities/User.entity";

declare module 'express' {
    interface Request {
        user: User
    }
}
