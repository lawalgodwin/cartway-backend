import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AdminGuard, AuthenticationGuard, CustomerGuard, SuperAdminGuard } from 'src/common/guards';

@ApiTags('users')
@UseGuards(AuthenticationGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AdminGuard, SuperAdminGuard)
  @ApiCreatedResponse({ description: 'User object created' })
  @ApiBadRequestResponse({ description: 'Bad request: Try again' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  @ApiAcceptedResponse({})
  findAll() {
    return this.usersService.find();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: `User not found` })
  async findOne(@Param('id') id: string): Promise<Partial<User>> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiNotFoundResponse({ description: `User not found` })
  @ApiAcceptedResponse({ description: 'Update a user with its ID' })
  @ApiBadRequestResponse({ description: `Bad request: Please try again` })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: `User not found` })
  @ApiAcceptedResponse({ description: 'Delete a user with its ID' })
  @ApiBadRequestResponse({ description: `Bad request: Please try again` })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
