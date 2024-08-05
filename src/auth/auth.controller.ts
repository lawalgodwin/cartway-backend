import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/resource/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'User registered sucessfully' })
  @ApiBadRequestResponse({ description: 'User not created: Please try again' })
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.authService.loginUser(loginDto);
    return { status: HttpStatus.ACCEPTED, accessToken };
  }
}
