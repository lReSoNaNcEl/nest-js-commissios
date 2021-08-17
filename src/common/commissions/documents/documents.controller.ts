import { Controller, Param, ParseIntPipe, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../../files/filters/documents-files.filter";
import { CommissionDocument } from "./entities/CommissionDocument.entity";
import { FilesService } from "../../files/files.service";
import { IDocumentsController } from "./interfaces/documents-controller.inteface";
import {Auth} from "../../auth/auth.decorator";

@ApiTags('Documents Of Commission')
@Controller('commissions/:commissionId/documents')
export class DocumentsController implements IDocumentsController {

    constructor(
        private filesService: FilesService
    ) {}

    @Auth()
    @Post()
    @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
    async uploadDocumentsOfCommission(
        @UploadedFiles() files: Express.Multer.File[],
        @Param('commissionId', ParseIntPipe) commissionId: number
    ): Promise<CommissionDocument> {
        const uploadedFiles = await this.filesService.uploadFiles(files)
        console.log(uploadedFiles)
        return <any>{}
    }

}
