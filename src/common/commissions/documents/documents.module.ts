import { Module } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentsRepository } from "./documents.repository"
import { FilesModule } from "../../files/files.module";
import { DocumentsController } from "./documents.controller";
import { CommissionsService } from "../index/commissions.service";
import { CommissionsRepository } from "../index/commissions.repository";
import { UsersRepository } from "../../users/users.repository";
import { CategoriesService } from "../categories/categories.service";
import { SourcesService } from "../sources/sources.service";
import { ReportsService } from "../reports/index/reports.service";
import { CategoriesRepository } from "../categories/categories.repository";
import { SourcesRepository } from "../sources/sources.repository";
import { ReportsRepository } from "../reports/index/reports.repository";
import { UsersService } from "../../users/users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([DocumentsRepository, CommissionsRepository, UsersRepository, CategoriesRepository, SourcesRepository, ReportsRepository]),
        FilesModule
    ],
    controllers: [DocumentsController],
    providers: [DocumentsService, CommissionsService, CategoriesService, SourcesService, ReportsService, UsersService],
    exports: [DocumentsService]
})
export class DocumentsModule {}
