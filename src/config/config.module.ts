import { Global, Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_DATABASE_URL: Joi.string().required(),
        SMTP_HOST: Joi.string().required(),
        SMTP_USER: Joi.string().required(),
        SMTP_PASSWORD: Joi.string().required(),
        EMAILS_FROM_EMAIL: Joi.string().required(),
        SMTP_TLS: Joi.boolean().required(),
        SMTP_SSL: Joi.boolean().required(),
        SMTP_PORT: Joi.number().required(),
        OTP_LENGTH: Joi.number().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        CACHE_TTL: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        FIRST_SUPERUSER_EMAIL: Joi.string().required(),
        FIRST_SUPERUSER: Joi.string().required(),
        FIRST_SUPERUSER_PASSWORD: Joi.string().required(),
        MONNIFY_API_KEY: Joi.string().required(),
        MONNIFY_SECRET_KEY: Joi.string().required(),
        MONNIFY_BASE_URL: Joi.string().required(),
        MONNIFY_CONTRACT_CODE: Joi.number().required(),
        MONNIFY_CARD_PAYMENT_METHOD: Joi.string().required(),
        MONNIFY_ACCOUNT_TRANSFER_PAYMENT_METHOD: Joi.string().required(),
        REDIRECT_URL: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
