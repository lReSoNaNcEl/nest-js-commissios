import {entities} from '../database/entities'
import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import {registerAs} from '@nestjs/config'
import { subscribers } from "../database/subscribers";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { join } from "path";
import { ServeStaticModuleOptions } from "@nestjs/serve-static"
import {path} from 'app-root-path'

export enum StaticFolder {
    FILES = 'files'
}

export const StaticDir = {
    FOLDER: join(path, 'static'),
    FILES:  join(path, 'static', StaticFolder.FILES)
}

export const ApplicationConfig = registerAs('app', () => ({
    database: <TypeOrmModuleOptions>{
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [...entities],
        subscribers: [...subscribers],
        synchronize: true,
        keepConnectionAlive: true,
    },
    multer: <MulterOptions>{
        limits: {
            fileSize: 52428800 //50MB
        }
    },
    static: <ServeStaticModuleOptions[]>[
        {
            rootPath: StaticDir.FOLDER
        }
    ]
}))
