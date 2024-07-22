import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/resource/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationMail(user: Partial<User>, otp: string) {
    const fullName = `${user.firstName} ${user.lastName}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Cartway! Please confirm your Email',
      template: './confirmation',
      context: {
        fullName: fullName,
        otp: otp,
      },
    });
  }
}
