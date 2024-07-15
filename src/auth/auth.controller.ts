import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/resource/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post('register')
    registerUser (@Body() createUserDto: CreateUserDto) {
        return this.authService.registerUser(createUserDto)
    }
}
