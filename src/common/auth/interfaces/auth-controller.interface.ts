import { AuthSignupDto } from "../dto/auth-signup.dto";
import { AuthLoginDto } from "../dto/auth-login.dto";

export interface IAuthController {
    signup(dto: AuthSignupDto)
    login(dto: AuthLoginDto)
}
