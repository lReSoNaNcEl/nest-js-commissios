import { Injectable } from "@nestjs/common";
import { DocumentsRepository } from "./documents.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { IDocumentsService } from "./interfaces/documents-service.interface";
import {FilesService} from "../../../files/files.service";
import { CreateReportDocumentDto } from "./dto/create-report-document.dto";
import { ReportsService } from "../index/reports.service";
import { ReportDocument } from "./entities/ReportDocument.entity";

@Injectable()
export class DocumentsService implements IDocumentsService {

    constructor(
        @InjectRepository(DocumentsRepository)
        private documentsRepository: DocumentsRepository,
        private filesService: FilesService,
        private reportsService: ReportsService
    ) {}

    async uploadDocumentsOfReport(files: Express.Multer.File[], reportId: number): Promise<ReportDocument[]> {
        const report = await this.reportsService.getReport(reportId)
        const uploadedFiles = await this.filesService.uploadFiles(files)
        return Promise.all(uploadedFiles.map((file) => {
            const dto = new CreateReportDocumentDto()
            dto.url = file.url
            dto.size = file.size
            dto.path = file.path
            dto.filename = file.filename
            dto.mimetype = file.mimetype
            dto.originalName = file.originalName
            dto.report = report
            const document = this.documentsRepository.create(dto)
            return this.documentsRepository.save(document)
        }))
    }

}
