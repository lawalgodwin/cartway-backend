import { Injectable } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
import { Role } from 'src/enums';

@Injectable()
export class VendorGuard extends AuthorizationGuard {
  constructor() {
    super([Role.VENDOR]);
  }
}
