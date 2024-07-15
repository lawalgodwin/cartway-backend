import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UsersRepository } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor (private readonly userRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = new User(createUserDto)
    return await this.userRepository.create(newUser);
  }

  async findAll() {
    return await this.userRepository.find({});
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.findOneAndUpdate({ id }, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.findOneAndDelete({ id })
  }
}
