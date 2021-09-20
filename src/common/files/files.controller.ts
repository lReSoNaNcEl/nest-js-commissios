import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service'


@Controller()
export class FilesController {
    constructor(
        private filesService: FilesService,
    ) {
    }

    @Post('files')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
        return this.filesService.uploadFiles(files)
    }
}


