import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { OTP_QUEUE, VERIFY_EMAIL_ADDRESS } from 'src/common';
import { generateOtp } from 'src/helpers';
import { CreateUserDto } from 'src/resource/users/dto/create-user.dto';
import { UsersService } from 'src/resource/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    @InjectQueue(OTP_QUEUE) private readonly otpMailQueue: Queue
  ) {}

  // register a user
  async registerUser(newUserDeatils: CreateUserDto) {
    const otp = await generateOtp(6);
    await this.otpMailQueue.add(VERIFY_EMAIL_ADDRESS, {user: newUserDeatils, code: otp})
    return this.userService.create(newUserDeatils);
  }
}
