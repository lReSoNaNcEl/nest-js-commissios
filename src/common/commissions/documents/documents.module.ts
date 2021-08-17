import { Module } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentsRepository } from "./documents.repository"
import { FilesModule } from "../../files/files.module";
import { DocumentsController } from "./documents.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([DocumentsRepository]),
        FilesModule
    ],
    controllers: [DocumentsController],
    providers: [DocumentsService],
    exports: [DocumentsService]
})
export class DocumentsModule {}
