import { Injectable, Param, ParseIntPipe, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { DocumentsRepository } from "./documents.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { IDocumentsService } from "./interfaces/documents-service.interface";
import { FilesService } from "../../files/files.service";

@Injectable()
export class DocumentsService implements IDocumentsService {

    constructor(
        @InjectRepository(DocumentsRepository)
        private documentsRepository: DocumentsRepository,
    ) {}

}
