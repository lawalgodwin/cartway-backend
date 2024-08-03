import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/resource/users/users.module';
import { AuthService } from './auth.service';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { OTP_QUEUE } from 'src/common';

@Module({
  imports: [
    UsersModule,
    MailModule,
    BullModule.registerQueue({
      name: OTP_QUEUE,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
