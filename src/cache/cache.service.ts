import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class CacheService {
  client: RedisClientType;

  constructor(configService: ConfigService) {
    const REDIS_HOST = configService.get('REDIS_HOST') || 'localhost';
    const REDIS_PORT = configService.get('REDIS_PORT') || 6379;

    try {
      this.client = createClient({
        socket: { host: REDIS_HOST, port: REDIS_PORT },
      });
      this.client.connect();
    } catch (error) {
      Logger.error('Error connecting to redis cache store', error.message);
    }
  }

  async isAlive() {
    return this.client.isOpen && this.client.isReady;
  }
}
