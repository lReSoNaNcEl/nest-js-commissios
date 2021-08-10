import {Strategy, ExtractJwt} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {UsersService} from '../users/users.service'
import {Injectable} from '@nestjs/common'
import {User} from '../users/entities/User.entity'

interface JwtPayload {
    id: number
    email: string
    iat: number
    exp: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private usersService: UsersService) {
        super({
            usernameField: 'email',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY
        })
    }

    async validate({id}: JwtPayload): Promise<User> {
        return await this.usersService.getUser(id)
    }

}
