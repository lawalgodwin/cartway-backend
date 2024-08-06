import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Role } from "../types";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor (private allowedRoles: Role[]) {}
    canActivate(context: ExecutionContext): boolean {
        const httpCtx = context.switchToHttp()
        const request = httpCtx.getRequest()
        const user = request['user']
        const allowed = this.isAllowed([user.role])
        if (!allowed) throw new ForbiddenException()
        return true
    }

    isAllowed(userRoles: Role[]) {
        let allowed = false
        userRoles.forEach(role => {
            if (!allowed && this.allowedRoles.includes(role)) {
                allowed = true
            }
        })
        return allowed
    }
}