import { ICommissionsRepository } from "./interfaces/commissions-repository.interface";
import { EntityRepository, Repository } from "typeorm";
import { Commission } from "./entities/Commission.entity";
import { NotFoundException } from "@nestjs/common";
import { Report } from "../reports/index/entities/Report.entity";

@EntityRepository(Commission)
export class CommissionsRepository extends Repository<Commission> implements ICommissionsRepository {

    getCommission(commissionId: number): Promise<Commission> {
        const commission = this.findOne({
            where: {
                id: commissionId
            },
            relations: ['reports', 'category', 'source']
        })
        if (!commission) throw new NotFoundException(`Commission with ID ${commissionId} not found!`)
        return commission
    }

    getCommissionsOfAdmin(): Promise<Commission[]> {
        return this.find({
            relations: ['category', 'source']
        })
    }

    getCommissionsOfImplementor(userId: number): Promise<Commission[]> {
        return this.createQueryBuilder('commission')
            .innerJoinAndMapMany('commission.reports', Report, 'report', `commission.id = report.commission.id and report.user.id = :userId`, {userId})
            .leftJoinAndSelect('commission.category', 'category')
            .leftJoinAndSelect('commission.source', 'source')
            .getMany()
    }

}
