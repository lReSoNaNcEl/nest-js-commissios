import {AuthGuard} from '@nestjs/passport'
import {UseGuards} from '@nestjs/common'
import { RoleGuard } from "./role.guard";

export const Auth = (...roles: string[]) => UseGuards(AuthGuard('jwt'), new RoleGuard(roles))
