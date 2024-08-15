import { Injectable } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';

@Injectable()
export class RiderGuard extends AuthorizationGuard {
  constructor() {
    super(['rider']);
  }
}
