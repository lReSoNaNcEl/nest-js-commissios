import {Module} from '@nestjs/common'
import { ReportsCommentsService } from "./reports-comments.service";
import {ReportsCommentsController} from './reports-comments.controller'
import {TypeOrmModule} from '@nestjs/typeorm'
import {ReportsCommentsRepository} from './reports-comments.repository'
import {UsersService} from '../../../users/users.service'
import {UsersRepository} from '../../../users/users.repository'
import { ReportsService } from "../index/reports.service";
import { ReportsRepository } from "../index/reports.repository";
import { FilesService } from "../../../files/files.service";
import { CommissionsService } from "../../index/commissions.service";
import { CommissionsRepository } from "../../index/commissions.repository";
import { CategoriesService } from "../../categories/categories.service";
import { SourcesService } from "../../sources/sources.service";
import { CategoriesRepository } from "../../categories/categories.repository";
import { SourcesRepository } from "../../sources/sources.repository";

@Module({
    imports: [TypeOrmModule.forFeature([
        ReportsCommentsRepository,
        UsersRepository,
        ReportsRepository,
        CommissionsRepository,
        CategoriesRepository,
        SourcesRepository
    ])],
    controllers: [ReportsCommentsController],
    providers: [
        ReportsCommentsService,
        UsersService,
        ReportsService,
        FilesService,
        CommissionsService,
        CategoriesService,
        SourcesService
    ],
    exports: [ReportsCommentsService]
})
export class ReportsCommentsModule {}
