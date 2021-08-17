import { Inject, Injectable, Scope } from "@nestjs/common";
import { IFilesService } from "./interfaces/files-service.interface";
import { IFile } from "./interfaces/file.interface";
import { ensureDir, writeFile } from "fs-extra";
import { StaticDir, StaticFolder } from "../../core/config";
import { v4 as uuid } from "uuid";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

@Injectable({scope: Scope.REQUEST})
export class FilesService implements IFilesService {

    constructor(
        @Inject(REQUEST)
        private req: Request
    ) {}

    async uploadFile(file: Express.Multer.File): Promise<IFile> {
        const {mimetype, originalname, size} = file
        const extension = originalname.split('.')[originalname.split('.').length - 1]

        const filename = `${uuid()}.${extension}`
        const osPath = `${StaticDir.FILES}/${filename}`
        const relativePath = `/${StaticFolder.FILES}/${filename}`

        await ensureDir(StaticDir.FILES)
        await writeFile(osPath, file.buffer)

        const {protocol, headers} = this.req

        return <IFile>{
            url: `${protocol}://${headers['host']}${relativePath}`,
            path: relativePath,
            originalName: originalname,
            mimetype, size, filename,
        }

    }

    uploadFiles(files: Express.Multer.File[]): Promise<IFile[]> {
        return Promise.all(files.map((file: Express.Multer.File) => this.uploadFile(file)))
    }

}
