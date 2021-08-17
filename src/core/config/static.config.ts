import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import { ServeStaticModuleOptions, ServeStaticModuleOptionsFactory } from "@nestjs/serve-static";

@Injectable()
export class StaticConfig implements ServeStaticModuleOptionsFactory {

    constructor(private configService: ConfigService) {}

    createLoggerOptions(): ServeStaticModuleOptions[] {
        return <ServeStaticModuleOptions[]>this.configService.get('app.static')
    }

}
