import { Module } from "@nestjs/common";
import { SourcesModule } from "../sources/sources.module";
import { CommissionsController } from "./commissions.controller";
import { CommissionsService } from "./commissions.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommissionsRepository } from "./commissions.repository";
import { CategoriesModule } from "../categories/categories.module";
import { ReportsModule } from "../reports/index/reports.module";
import { UsersRepository } from "../../users/users.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([CommissionsRepository, UsersRepository]),
        SourcesModule,
        CategoriesModule,
        ReportsModule,
    ],
    controllers: [CommissionsController],
    providers: [CommissionsService],
    exports: [CommissionsService]
})
export class CommissionsModule {}
