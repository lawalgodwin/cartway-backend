import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { CreateUserType } from 'src/common/types';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const { email, firstName, lastName, password, phone }: CreateUserType =
      createUserDto;
    const newUser = new User({ email, firstName, lastName, password, phone });
    const user = await this.find(newUser.email);

    // check if user exists
    if (user.length)
      throw new BadRequestException(
        'User with this email address already exist',
      );
    return this.userRepository.create(newUser);
  }

  async find(email?: string) {
    return await this.userRepository.find({ email });
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.findOneAndUpdate({ id }, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.findOneAndDelete({ id });
  }
}
