import { Injectable } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
<<<<<<< HEAD
import { Role } from 'src/enums';
=======
>>>>>>> cache

@Injectable()
export class CustomerGuard extends AuthorizationGuard {
  constructor() {
<<<<<<< HEAD
    super([Role.CUSTOMER]);
=======
    super(['customer']);
>>>>>>> cache
  }
}
