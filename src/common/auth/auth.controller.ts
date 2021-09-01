import { Controller, Body, Post, Get, UseInterceptors, UploadedFile, UploadedFiles } from "@nestjs/common";
import {AuthService} from './auth.service'
import {AuthLoginDto} from "./dto/auth-login.dto"
import {AuthSignupDto} from "./dto/auth-signup.dto"
import {ApiTags} from '@nestjs/swagger'
import { IAuthController } from "./interfaces/auth-controller.interface"
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../files/filters/documents-files.filter";

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

