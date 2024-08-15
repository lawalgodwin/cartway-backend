import { Injectable } from '@nestjs/common';
import { CacheService } from './cache';

@Injectable()
export class AppService {
  constructor(protected cacheService: CacheService) {}
  async getHomePage() {
    return `Welcome Home`;
  }
}
