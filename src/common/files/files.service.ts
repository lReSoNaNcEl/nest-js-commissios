import { Injectable } from "@nestjs/common";
import { IFilesService } from "./interfaces/files-service.interface"
import { IFile } from "./interfaces/file.interface";

@Injectable()
export class FilesService implements IFilesService {

    async uploadFile(file: Express.Multer.File): Promise<IFile> {
        console.log(file)

        const {mimetype} = file

        //...Save File In Public Directory

        return <IFile>{
            url: '...',
            path: '...',
            filename: '...',
            originalName: file.originalname,
            mimetype
        }

    }

}
