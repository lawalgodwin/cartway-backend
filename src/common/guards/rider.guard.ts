import { Injectable } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
import { Role } from 'src/enums';

@Injectable()
export class RiderGuard extends AuthorizationGuard {
  constructor() {
    super([Role.RIDER]);
  }
}
