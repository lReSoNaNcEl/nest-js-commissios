import { Controller, Get, Req } from "@nestjs/common";
import { Auth } from "../auth/auth.decorator";
import { Roles } from "./interfaces/user.interface";
import { User } from "./entities/User.entity";
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";
import { IUsersController } from "./interfaces/users-controller.interface";
import { Request } from "express";

@ApiTags('Users')
@Controller('users')
export class UsersController implements IUsersController {

    constructor(
        private usersService: UsersService
    ) {}

    @Auth(Roles.ADMIN)
    @Get('implementors')
    getImplementors(): Promise<User[]> {
        return this.usersService.getUsersByRole(Roles.IMPLEMENTOR)
    }

    @Auth()
    @Get('/me')
    getMe(@Req() req: Request): User {
        return req.user
    }

}
