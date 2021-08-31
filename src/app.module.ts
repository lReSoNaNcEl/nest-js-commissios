import {Module} from "@nestjs/common";
import {EventEmitterModule} from "@nestjs/event-emitter"
import {ConfigModule} from "@nestjs/config"
import {ApplicationConfig} from "./core/config";
import {DatabaseConfig} from "./core/config/database.config"
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from "./common/auth/auth.module";
import { UsersModule } from "./common/users/users.module";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfig } from "./core/config/multer.config"
import { CreateSourcesSeed } from "./core/database/seeds/create-sources.seed";
import { CommissionsModule } from "./common/commissions/index/commissions.module";
import { ServeStaticModule } from "@nestjs/serve-static"
import { CreateCategoriesSeed } from "./core/database/seeds/create-categories.seed";
import { StaticConfig } from "./core/config/static.config";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ApplicationConfig]
        }),
        MulterModule.registerAsync({useClass: MulterConfig}),
        TypeOrmModule.forRootAsync({useClass: DatabaseConfig}),
        ServeStaticModule.forRootAsync({useClass: StaticConfig}),
        EventEmitterModule.forRoot(),
        AuthModule,
        UsersModule,
        CommissionsModule,
    ]
})
export class AppModule {

    async onModuleInit() {
        await CreateSourcesSeed()
        await CreateCategoriesSeed()
    }

}
