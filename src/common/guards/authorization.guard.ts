import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
<<<<<<< HEAD
import { RoleType } from '../types';
import { USER_NOT_AUTHORIZED } from '../constants';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private allowedRoles: RoleType[]) {}
=======
import { Role } from '../types';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private allowedRoles: Role[]) {}
>>>>>>> cache
  canActivate(context: ExecutionContext): boolean {
    const httpCtx = context.switchToHttp();
    const request = httpCtx.getRequest();
    const user = request['user'];
    const allowed = this.isAllowed([user.role]);
<<<<<<< HEAD
    if (!allowed) throw new ForbiddenException(USER_NOT_AUTHORIZED);
    return true;
  }

  isAllowed(userRoles: RoleType[]) {
=======
    if (!allowed) throw new ForbiddenException();
    return true;
  }

  isAllowed(userRoles: Role[]) {
>>>>>>> cache
    let allowed = false;
    userRoles.forEach((role) => {
      if (!allowed && this.allowedRoles.includes(role)) {
        allowed = true;
      }
    });
    return allowed;
  }
}
