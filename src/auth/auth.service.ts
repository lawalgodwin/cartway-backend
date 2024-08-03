import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { OTP_QUEUE, VERIFY_EMAIL_ADDRESS } from 'src/common';
import { generateOtp } from 'src/helpers';
import { CreateUserDto } from 'src/resource/users/dto/create-user.dto';
import { UsersService } from 'src/resource/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly configSevice: ConfigService,
    @InjectQueue(OTP_QUEUE) private readonly otpMailQueue: Queue,
  ) {}

  // register a user
  async registerUser(newUserDeatils: CreateUserDto) {
    const otp = await generateOtp(this.configSevice.get<number>('OTP_LENGTH'));
    try {
      await this.userService.create(newUserDeatils);
      this.otpMailQueue.add(VERIFY_EMAIL_ADDRESS, {
        user: newUserDeatils,
        code: otp,
      });
      return 'Email sent to confirm user email address';
    } catch (error: any) {
      throw error;
    }
  }
}
