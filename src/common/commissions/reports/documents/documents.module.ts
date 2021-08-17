import { Module } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentsRepository } from "./documents.repository"
import {FilesModule} from "../../../files/files.module"
import {DocumentsController} from "./documents.controller"
import { ReportsService } from "../index/reports.service";
import { ReportsRepository } from "../index/reports.repository";
import { UsersService } from "../../../users/users.service";
import { UsersRepository } from "../../../users/users.repository";
import { CommissionsService } from "../../index/commissions.service";
import { CommissionsRepository } from "../../index/commissions.repository";
import { CategoriesService } from "../../categories/categories.service";
import { SourcesService } from "../../sources/sources.service";
import { CategoriesRepository } from "../../categories/categories.repository";
import { SourcesRepository } from "../../sources/sources.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            DocumentsRepository,
            ReportsRepository,
            UsersRepository,
            CommissionsRepository,
            CategoriesRepository,
            SourcesRepository
        ]),
        FilesModule
    ],
    controllers: [DocumentsController],
    providers: [
        DocumentsService,
        ReportsService,
        UsersService,
        CommissionsService,
        CategoriesService,
        SourcesService
    ],
    exports: [DocumentsService]
})
export class DocumentsModule {}
