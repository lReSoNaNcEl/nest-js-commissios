import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MulterConfig implements MulterOptionsFactory {

    constructor(private configService: ConfigService) {}

    createMulterOptions(): MulterModuleOptions {
        return <MulterOptions>this.configService.get('app.multer')
    }

}
