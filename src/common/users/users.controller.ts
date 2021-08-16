import { Controller, Get } from "@nestjs/common";
import { Auth } from "../auth/auth.decorator";
import { Roles } from "./interfaces/user.interface";
import { User } from "./entities/User.entity";
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) {}

    @Auth(Roles.ADMIN)
    @Get('implementors')
    getImplementors(): Promise<User[]> {
        return this.usersService.getUsersByRole(Roles.IMPLEMENTOR)
    }

}
