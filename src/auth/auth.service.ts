import { Injectable } from '@nestjs/common';
import { generateOtp } from 'src/helpers';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from 'src/resource/users/dto/create-user.dto';
import { UsersService } from 'src/resource/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private mailService: MailService,
  ) {}

  // register a user
  async registerUser(newUserDeatils: CreateUserDto) {
    const otp = await generateOtp(6);
    await this.mailService.sendConfirmationMail(newUserDeatils, otp);
    return this.userService.create(newUserDeatils);
  }
}
