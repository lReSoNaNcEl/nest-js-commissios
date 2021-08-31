import { forwardRef, Module } from "@nestjs/common";
import { SourcesModule } from "../sources/sources.module";
import { CommissionsController } from "./commissions.controller";
import { CommissionsService } from "./commissions.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommissionsRepository } from "./commissions.repository";
import { CategoriesModule } from "../categories/categories.module";
import { ReportsModule } from "../reports/index/reports.module";
import { UsersRepository } from "../../users/users.repository";
import { DocumentsModule } from "../documents/documents.module";
import { CommissionsCronService } from "./commissions.cron.service";
import { ReportsRepository } from "../reports/index/reports.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([CommissionsRepository, UsersRepository, ReportsRepository]),
        SourcesModule,
        CategoriesModule,
        forwardRef(() => ReportsModule),
        DocumentsModule
    ],
    controllers: [CommissionsController],
    providers: [CommissionsService, CommissionsCronService],
    exports: [CommissionsService]
})
export class CommissionsModule {}
