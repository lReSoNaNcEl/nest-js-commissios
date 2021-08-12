import { HttpException, HttpStatus } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { Request } from "express";

export const formats = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/pdf'
]

export const multerOptions = <MulterOptions>{
    fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
        if (!formats.includes(file.mimetype))
            cb(new HttpException(`Unsupported file type ${file.mimetype}`, HttpStatus.BAD_REQUEST), false)
        cb(null, true)
    }
}
