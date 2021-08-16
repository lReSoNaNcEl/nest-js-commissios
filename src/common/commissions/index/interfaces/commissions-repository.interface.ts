import { Commission } from "../entities/Commission.entity";
import { User } from "../../../users/entities/User.entity";

export interface ICommissionsRepository {
    getCommission(commissionId: number): Promise<Commission>
    getCommissionsOfAdmin: () => Promise<Commission[]>
    getCommissionsOfImplementor: (userId: number) => Promise<Commission[]>
}
