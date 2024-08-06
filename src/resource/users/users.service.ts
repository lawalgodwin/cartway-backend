import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import {
  RoleType,
  UserCreationResponseType,
  UserUpdateResponseType,
} from 'src/common/types';
import { USER_ALREADY_EXISTS } from 'src/common';
import { Role } from 'src/enums';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto | User, logedInUserRole: Role) {
    const newUser = new User(createUserDto);
    // prevent the superuser from accidentally creating another superuser
    if (newUser.role === Role.SUPERADMIN)
      throw new UnprocessableEntityException();
    const user = await this.find(newUser.email);

    // prevent the admin from creating another admin
    if (
      logedInUserRole === Role.ADMIN &&
      ![Role.RIDER, Role.VENDOR, Role.CUSTOMER].includes(newUser.role)
    )
      throw new UnprocessableEntityException();

    // check if user exists
    if (user.length) throw new BadRequestException(USER_ALREADY_EXISTS);
    return this.userRepository.create(newUser);
  }

  async find(email?: string | Role) {
    return await this.userRepository.find({ email });
  }

  async findOne(id: string): Promise<UserCreationResponseType> {
    const { password, role, hashPassword, ...rest } =
      await this.userRepository.findOne({ id });
    return { ...rest };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserUpdateResponseType> {
    const { password, hashPassword, ...rest } =
      await this.userRepository.findOneAndUpdate({ id }, updateUserDto);
    return rest;
  }

  async remove(id: string) {
    return await this.userRepository.findOneAndDelete({ id });
  }

  async allVendors() {
    return this.userRepository.find({ role: Role.VENDOR });
  }
}
