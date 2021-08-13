import { Commission } from "../entities/Commission.entity";
import { User } from "../../../users/entities/User.entity";

export interface ICommissionsRepository {
    getCommissionsOfAdmin: (user: User) => Promise<Commission[]>
    getCommissionsOfImplementor: (user: User) => Promise<Commission[]>
}
