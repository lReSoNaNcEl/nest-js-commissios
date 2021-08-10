import {AuthLoginDto} from "../dto/auth-login.dto";
import {AuthSignupDto} from "../dto/auth-signup.dto";
import {User} from '../../users/entities/User.entity'
import {IAuthLoginResponse} from './auth-login-response.interface'

export interface IAuthService {
    signup: (dto: AuthSignupDto) => Promise<User>
    login: (dto: AuthLoginDto) => Promise<IAuthLoginResponse>
}
