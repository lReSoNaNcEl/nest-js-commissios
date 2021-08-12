import {Module} from '@nestjs/common'
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'
import {UsersService} from '../users/users.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {JwtStrategy} from './jwt.strategy'
import {PassportModule} from '@nestjs/passport'
import {UsersRepository} from '../users/users.repository'
import { FilesModule } from "../files/files.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersRepository]),
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false
        }),
        FilesModule
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService, JwtStrategy]
})
export class AuthModule {}
