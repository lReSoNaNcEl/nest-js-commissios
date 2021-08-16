import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportsRepository } from "./reports.repository";
import { ReportsService } from "./reports.service";
import { ReportsController } from "./reports.controller";
import { UsersService } from "../../../users/users.service";
import { CommissionsService } from "../../index/commissions.service";
import { CommissionsRepository } from "../../index/commissions.repository";
import { UsersRepository } from "../../../users/users.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([ReportsRepository, UsersRepository, CommissionsRepository])
    ],
    controllers: [ReportsController],
    providers: [ReportsService, UsersService, CommissionsService],
    exports: [ReportsService],
})
export class ReportsModule {}
