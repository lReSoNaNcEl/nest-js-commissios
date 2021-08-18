import { ICommissionsController } from "./interfaces/commissions-controller.interface";
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Commission } from "./entities/Commission.entity";
import { CommissionsService } from "./commissions.service";
import { Auth } from "../../auth/auth.decorator"
import {Roles} from "../../users/interfaces/user.interface";
import { CreateCommissionDto } from './dto/create-commission.dto'
import { UpdateCommissionDto } from "./dto/update-commission.dto";

@ApiTags('Commissions')
@Controller('commissions')
export class CommissionsController implements ICommissionsController {

    constructor(
        private commissionsService: CommissionsService,
    ) {}

    @Auth()
    @Get(':commissionId')
    getCommission(@Param('commissionId', ParseIntPipe) commissionId: number): Promise<Commission> {
        return this.commissionsService.getCommission(commissionId)
    }

    @Auth()
    @Get()
    getCommissions(): Promise<Commission[]> {
        return this.commissionsService.getCommissions()
    }

    @Auth(Roles.ADMIN)
    @Post()
    createCommission(@Body() dto: CreateCommissionDto) {
        return this.commissionsService.createCommission(dto)
    }

    // @Auth(Roles.ADMIN)
    @Put(':commissionId')
    updateCommission(
        @Body() dto: UpdateCommissionDto,
        @Param('commissionId', ParseIntPipe) commissionId: number
    ) {
        return this.commissionsService.updateCommission(dto, commissionId)
    }

}
