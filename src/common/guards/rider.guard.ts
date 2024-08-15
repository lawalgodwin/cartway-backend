import { Injectable } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
<<<<<<< HEAD
import { Role } from 'src/enums';
=======
>>>>>>> cache

@Injectable()
export class RiderGuard extends AuthorizationGuard {
  constructor() {
<<<<<<< HEAD
    super([Role.RIDER]);
=======
    super(['rider']);
>>>>>>> cache
  }
}
