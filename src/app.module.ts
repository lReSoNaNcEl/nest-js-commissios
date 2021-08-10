import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter"
import {ConfigModule} from "@nestjs/config"
import {ApplicationConfig} from "./core/config";
import {DatabaseConfig} from "./core/config/database.config"
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from "./common/auth/auth.module";
import { UsersModule } from "./common/users/users.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ApplicationConfig]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: DatabaseConfig,
        }),
        EventEmitterModule.forRoot(),
        AuthModule,
        UsersModule
    ]
})
export class AppModule {

}
