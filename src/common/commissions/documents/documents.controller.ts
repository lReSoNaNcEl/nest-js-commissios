import { Controller, Delete, Param, ParseIntPipe, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../../files/filters/documents-files.filter";
import { CommissionDocument } from "./entities/CommissionDocument.entity";
import { IDocumentsController } from "./interfaces/documents-controller.inteface";
import {Auth} from "../../auth/auth.decorator";
import { DocumentsService } from "./documents.service";
import { DeleteResult } from "typeorm";

@ApiTags('Documents Of Commission')
@Controller('commissions/:commissionId/documents')
export class DocumentsController implements IDocumentsController {

    constructor(
        private documentsService: DocumentsService
    ) {}

    @Auth()
    @Post()
    @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
    async uploadDocumentsOfCommission(
        @UploadedFiles() files: Express.Multer.File[],
        @Param('commissionId', ParseIntPipe) commissionId: number
    ): Promise<CommissionDocument[]> {
        return this.documentsService.uploadDocumentsOfCommission(files, commissionId)
    }

    @Auth()
    @Delete(':documentId')
    async deleteDocument(@Param('documentId', ParseIntPipe) documentId: number): Promise<DeleteResult> {
        return this.documentsService.deleteDocument(documentId)
    }

}
