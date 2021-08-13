import { ICommissionsController } from "./interfaces/commissions-controller.interface";
import { Controller, Get, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Commission } from "./entities/Commission.entity";
import { CommissionsService } from "./commissions.service";
import { Auth } from "../../auth/auth.decorator"
import {Roles} from "../../users/interfaces/user.interface";
import { CreateCommissionDto } from "./dto/create-commission.dto";

@ApiTags('Commissions')
@Controller('commissions')
export class CommissionsController implements ICommissionsController {

    constructor(
        private commissionsService: CommissionsService
    ) {}

    @Auth(Roles.ADMIN)
    @Post()
    createCommission(dto: CreateCommissionDto): Promise<Commission> {
        return this.commissionsService.createCommission(dto)
    }

    @Auth()
    @Get()
    getCommissions(): Promise<Commission[]> {
        return this.commissionsService.getCommissions()
    }

}
