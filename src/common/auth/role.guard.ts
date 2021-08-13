import { CACHE_MANAGER, CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import {Observable} from 'rxjs'
import {User} from "../users/entities/User.entity"
import { cache } from "../../main";
import { Cache } from "../../core/cache";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private roles?: string[],
    ) {}

    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const user: User = ctx.switchToHttp().getRequest().user
        cache.set(Cache.CURRENT_USER, user)

        if (!this.roles.length)
            return true

        return this.roles.includes(user.role)
    }

}
