import { Module } from "@nestjs/common";
import { SourcesModule } from "../sources/sources.module";
import { CommissionsController } from "./commissions.controller";
import { CommissionsService } from "./commissions.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommissionsRepository } from "./commissions.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([CommissionsRepository]),
        SourcesModule
    ],
    controllers: [CommissionsController],
    providers: [CommissionsService]
})
export class CommissionsModule {}
