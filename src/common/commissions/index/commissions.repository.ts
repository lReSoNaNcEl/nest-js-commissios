import { ICommissionsRepository } from "./interfaces/commissions-repository.interface";
import { EntityRepository, Repository } from "typeorm";
import { Commission } from "./entities/Commission.entity";
import { User } from "../../users/entities/User.entity";

@EntityRepository(Commission)
export class CommissionsRepository extends Repository<Commission> implements ICommissionsRepository {

    getCommissionsOfAdmin(user: User): Promise<Commission[]> {
        return this.find({
            where: {user}
        })
    }

    getCommissionsOfImplementor(user: User): Promise<Commission[]> {
        return this.createQueryBuilder('commission')
            .leftJoin('commission.user', 'user')
            .where('user.id = :userId', {userId: user.id})
            .getMany()
    }

}
