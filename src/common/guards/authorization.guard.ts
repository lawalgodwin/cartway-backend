import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RoleType } from '../types';
import { USER_NOT_AUTHORIZED } from '../constants';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private allowedRoles: RoleType[]) {}
  canActivate(context: ExecutionContext): boolean {
    const httpCtx = context.switchToHttp();
    const request = httpCtx.getRequest();
    const user = request['user'];
    const allowed = this.isAllowed([user.role]);
    if (!allowed) throw new ForbiddenException(USER_NOT_AUTHORIZED);
    return true;
  }

  isAllowed(userRoles: RoleType[]) {
    let allowed = false;
    userRoles.forEach((role) => {
      if (!allowed && this.allowedRoles.includes(role)) {
        allowed = true;
      }
    });
    return allowed;
  }
}
