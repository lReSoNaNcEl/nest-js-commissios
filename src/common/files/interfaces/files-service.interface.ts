import { IFile } from "./file.interface";

export interface IFilesService {
    uploadFile: (file: Express.Multer.File) => Promise<IFile>
    uploadFiles(files: Express.Multer.File[]): Promise<IFile[]>
    removeFile(path: string): Promise<void>
}
