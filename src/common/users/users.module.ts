import {Module} from '@nestjs/common'
import {UsersService} from './users.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {UsersRepository} from './users.repository'
import { UsersController } from "./users.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersRepository]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
