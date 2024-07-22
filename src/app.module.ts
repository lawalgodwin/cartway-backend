import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './resource/users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, MailModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
