import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter"
import {ConfigModule} from "@nestjs/config"
import {ApplicationConfig} from "./core/config";
import {DatabaseConfig} from "./core/config/database.config"
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from "./common/auth/auth.module";
import { UsersModule } from "./common/users/users.module";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfig } from "./core/config/multer.config";
import { Connection } from "typeorm";
import { CreateSourcesSeed } from "./core/database/seeds/create-sources.seed";
import { CommissionsModule } from "./common/commissions/index/commissions.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ApplicationConfig]
        }),
        MulterModule.registerAsync({
            useClass: MulterConfig
        }),
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfig,
        }),
        EventEmitterModule.forRoot(),
        AuthModule,
        UsersModule,
        CommissionsModule
    ]
})
export class AppModule {

    constructor(private connection: Connection) {}

    async onModuleInit() {
        await CreateSourcesSeed(this.connection)
    }

}
