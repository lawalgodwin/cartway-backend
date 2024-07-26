import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './resource/users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    DatabaseModule, 
    UsersModule, 
    AuthModule, 
    MailModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      }
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
