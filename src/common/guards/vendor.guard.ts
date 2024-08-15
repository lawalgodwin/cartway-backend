import { Injectable } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
<<<<<<< HEAD
import { Role } from 'src/enums';
=======
>>>>>>> cache

@Injectable()
export class VendorGuard extends AuthorizationGuard {
  constructor() {
<<<<<<< HEAD
    super([Role.VENDOR]);
=======
    super(['vendor']);
>>>>>>> cache
  }
}
