import { ICommissionsService } from "./interfaces/commissions-service.interface";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { CommissionsRepository } from "./commissions.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { cache } from "../../../main";
import { Cache } from "../../../core/cache";
import { User } from "../../users/entities/User.entity";
import { Roles } from "../../users/interfaces/user.interface";
import { CreateCommissionDto } from "./dto/create-commission.dto";

@Injectable()
export class CommissionsService implements ICommissionsService {

    constructor(
        @InjectRepository(CommissionsRepository)
        private commissionsRepository: CommissionsRepository
    ) {}

    createCommission(dto: CreateCommissionDto) {

        const {categoryId, sourceId} = dto
        return <any>{}
    }

    getCommissions(): Promise<any> {
        const user: User = cache.get(Cache.CURRENT_USER)

        switch (user.role) {
            case Roles.ADMIN: {
                return this.commissionsRepository.getCommissionsOfAdmin(user)
            }
            case Roles.IMPLEMENTOR: {
                return  this.commissionsRepository.getCommissionsOfImplementor(user)
            }
        }

    }

}
