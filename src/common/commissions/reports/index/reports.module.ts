import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ReportsRepository } from "./reports.repository"
import { ReportsService } from "./reports.service"
import { ReportsController } from "./reports.controller"
import { UsersService } from "../../../users/users.service"
import { CommissionsService } from "../../index/commissions.service"
import { CommissionsRepository } from "../../index/commissions.repository"
import { UsersRepository } from "../../../users/users.repository"
import { CategoriesService } from "../../categories/categories.service"
import { CategoriesRepository } from "../../categories/categories.repository"
import { SourcesRepository } from "../../sources/sources.repository"
import { SourcesService } from "../../sources/sources.service"
import {DocumentsModule} from "../documents/documents.module"
import { FilesService } from "../../../files/files.service";
import { SchedulerRegistry } from "@nestjs/schedule";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ReportsRepository,
            UsersRepository,
            CommissionsRepository,
            CategoriesRepository,
            SourcesRepository,
        ]),
        DocumentsModule
    ],
    controllers: [ReportsController],
    providers: [
        ReportsService,
        UsersService,
        CommissionsService,
        CategoriesService,
        SourcesService,
        FilesService,
    ],
    exports: [ReportsService],
})
export class ReportsModule {}
