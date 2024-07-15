import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/resource/users/dto/create-user.dto';
import { UsersService } from 'src/resource/users/users.service';

@Injectable()
export class AuthService {
    constructor (private userService: UsersService) {}

    // register a user
    async registerUser (newUserDeatils: CreateUserDto) {
        return this.userService.create(newUserDeatils)
    }
}
