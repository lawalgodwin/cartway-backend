import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { USER_NOT_AUTHENTICATED } from '../constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const httpCtx = context.switchToHttp();
    const request = httpCtx.getRequest();
    const user = request['user'];
    if (!user) throw new UnauthorizedException(USER_NOT_AUTHENTICATED);
    return true;
  }
}
