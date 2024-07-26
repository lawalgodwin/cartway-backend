import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bullmq';
import { OTP_QUEUE, VERIFY_EMAIL_ADDRESS } from 'src/common';
import { OTP } from 'src/common/types/otp.type';

@Processor(OTP_QUEUE)
export class MailService {
  constructor(private mailerService: MailerService) {}

  @Process(VERIFY_EMAIL_ADDRESS)
  async sendConfirmationMail(job: Job<OTP>) {
    const fullName = `${job.data.user.firstName} ${job.data.user.lastName}`;

    await this.mailerService.sendMail({
      to: job.data.user.email,
      subject: 'Welcome to Cartway! Please confirm your Email',
      template: './confirmation',
      context: {
        fullName: fullName,
        otp: job.data.code,
      },
    });
  }
}
