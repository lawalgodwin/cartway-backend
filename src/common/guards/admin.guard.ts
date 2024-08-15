import { Injectable } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
<<<<<<< HEAD
import { Role } from 'src/enums';
=======
>>>>>>> cache

@Injectable()
export class AdminGuard extends AuthorizationGuard {
  constructor() {
<<<<<<< HEAD
    super([Role.ADMIN, Role.SUPERADMIN]);
=======
    super(['admin']);
>>>>>>> cache
  }
}
