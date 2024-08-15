import { Injectable } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
<<<<<<< HEAD
import { Role } from 'src/enums';
=======
>>>>>>> cache

@Injectable()
export class SuperAdminGuard extends AuthorizationGuard {
  constructor() {
<<<<<<< HEAD
    super([Role.SUPERADMIN]);
=======
    super(['superadmin']);
>>>>>>> cache
  }
}
