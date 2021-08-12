import { Module } from "@nestjs/common";
import { SourcesController } from "./sources.controller";
import { SourcesService } from "./sources.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SourcesRepository } from "./sources.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([SourcesRepository])
    ],
    controllers: [SourcesController],
    providers: [SourcesService]
})
export class SourcesModule {}
