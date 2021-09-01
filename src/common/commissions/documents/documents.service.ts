import { Injectable, OnModuleInit } from "@nestjs/common";
import { DocumentsRepository } from "./documents.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { IDocumentsService } from "./interfaces/documents-service.interface";
import { FilesService } from "../../files/files.service";
import { CommissionDocument } from "./entities/CommissionDocument.entity";
import { CreateCommissionDocumentDto } from "./dto/create-commission-document.dto";
import { CommissionsService } from "../index/commissions.service";
import { DeleteResult } from "typeorm";

@Injectable()
export class DocumentsService implements IDocumentsService {

    constructor(
        @InjectRepository(DocumentsRepository)
        private documentsRepository: DocumentsRepository,
        private filesService: FilesService,
        private commissionsService: CommissionsService
    ) {}

    async uploadDocumentsOfCommission(files: Express.Multer.File[], commissionId: number): Promise<CommissionDocument[]> {
        const commission = await this.commissionsService.getCommission(commissionId)
        const uploadedFiles = await this.filesService.uploadFiles(files)
        return Promise.all(uploadedFiles.map((file) => {
            const dto = new CreateCommissionDocumentDto()
            dto.url = file.url
            dto.size = file.size
            dto.path = file.path
            dto.filename = file.filename
            dto.mimetype = file.mimetype
            dto.originalName = file.originalName
            dto.commission = commission
            const document = this.documentsRepository.create(dto)
            return this.documentsRepository.save(document)
        }))
    }

    getDocument(documentId: number): Promise<CommissionDocument> {
        return this.documentsRepository.getDocument(documentId)
    }

    async deleteDocument(documentId: number): Promise<DeleteResult> {
        const document = await this.getDocument(documentId)
        await this.filesService.removeFile(document.path)
        return this.documentsRepository.delete(documentId)
    }

}
