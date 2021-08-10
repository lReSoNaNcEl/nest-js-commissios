import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm'

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {

    constructor(private configService: ConfigService) {}

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return <TypeOrmModuleOptions>this.configService.get('app.database')
    }

}
