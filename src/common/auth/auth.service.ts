import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common'
import {IAuthService} from './interfaces/auth-service.interface'
import {InjectRepository} from '@nestjs/typeorm'
import {User} from '../users/entities/User.entity'
import {AuthLoginDto} from "./dto/auth-login.dto"
import {AuthSignupDto} from "./dto/auth-signup.dto"
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import {UsersService} from '../users/users.service'
import {UsersRepository} from '../users/users.repository'
import {IAuthLoginResponse} from './interfaces/auth-login-response.interface'

@Injectable()
export class AuthService implements IAuthService {

    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private usersService: UsersService,
    ) {}

    async signup(dto: AuthSignupDto): Promise<User> {
        const {email} = dto

        if (await this.usersRepository.getUserByEmail(email))
            throw new HttpException(`User with email ${email} already exists`, HttpStatus.CONFLICT)

        const user: User = await this.usersService.createUser(dto)

        return await user.save()
    }

    async login(dto: AuthLoginDto): Promise<IAuthLoginResponse> {
        const {email, password} = dto
        const user: User = await this.usersRepository.getUserByEmail(email)

        if (!user || !bcrypt.compareSync(password, user.password))
            throw new UnauthorizedException('Authorization error, check the correctness of the entered data')

        const token = jwt.sign({id: user.id, email}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES || '1d'})
        const {iat, exp} = <any>jwt.verify(token, process.env.JWT_SECRET_KEY)

        return <IAuthLoginResponse>{token, iat, exp}
    }

}
