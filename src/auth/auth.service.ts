import { InjectQueue } from '@nestjs/bull';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import {
  EMAIL_OR_PASSWORD_NOT_CORRECT,
  OTP_QUEUE,
  VERIFY_EMAIL_ADDRESS,
} from 'src/common';
import {
  generateOtp,
  getSignedJwtToken,
  verifyPasswordMatch,
} from 'src/helpers';
import { CreateUserDto } from 'src/resource/users/dto/create-user.dto';
import { UsersService } from 'src/resource/users/users.service';
import { LoginDto } from './dto';

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
      const { email, firstName, lastName, password, phone } = newUserDeatils
      await this.userService.create({email, firstName, lastName, password, phone});
      this.otpMailQueue.add(VERIFY_EMAIL_ADDRESS, {
        user: newUserDeatils,
        code: otp,
      });
      return 'Email sent to confirm user email address';
    } catch (error: any) {
      throw error;
    }
  }

  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const users = await this.userService.find(email);
    if (!users.length)
      throw new UnauthorizedException(EMAIL_OR_PASSWORD_NOT_CORRECT);
    const user = users[0];
    const hashedPassword = user.password;
    const isPasswordMatch = await verifyPasswordMatch(password, hashedPassword);
    if (!isPasswordMatch)
      throw new UnauthorizedException(EMAIL_OR_PASSWORD_NOT_CORRECT);
    const accessToken = await getSignedJwtToken({ email, role: user.role });
    return accessToken;
  }
}
