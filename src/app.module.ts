import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './resource/users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from './config';
import { ConfigService } from '@nestjs/config';
import { GetUserMiddleware } from './middleware/get-user.middleware';
import { UsersController } from './resource/users/users.controller';
import { VendorModule } from './resource/vendors/vendor.module';
import { CacheModule } from './cache';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './resource/orders/orders.module';
import { VendorController } from './resource/vendors/controllers/vendor.controller';
import { MenuController } from './resource/vendors/controllers/menu.controller';
import { FilesModule } from './resource/files/files.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    MailModule,
    CacheModule,
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    VendorModule,
    PaymentsModule,
    OrdersModule,
    FilesModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetUserMiddleware)
      .forRoutes(UsersController, VendorController, MenuController);
  }
}
