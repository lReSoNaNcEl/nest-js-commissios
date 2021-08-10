import {Controller, Body, Post} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthLoginDto} from "./dto/auth-login.dto"
import {AuthSignupDto} from "./dto/auth-signup.dto"
import {ApiTags} from '@nestjs/swagger'
import { IAuthController } from "./interfaces/auth-controller.interface";

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements IAuthController {

    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthSignupDto) {
        return this.authService.signup(dto)
    }

    @Post('login')
    login(@Body() dto: AuthLoginDto) {
        return this.authService.login(dto)
    }

}
