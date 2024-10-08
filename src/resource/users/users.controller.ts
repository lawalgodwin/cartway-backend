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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiHeaders,
  ApiNotFoundResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import {
  AdminGuard,
  AuthenticationGuard,
  CurrentUser,
  RoleType,
  SuperAdminGuard,
} from 'src/common';
import { JwtPayload } from 'src/common/types/jwtpayload.type';

@ApiTags('users')
@UseGuards(AuthenticationGuard)
@UseGuards(AdminGuard)
@ApiHeaders([{name: 'x-auth', required: true}])
@ApiSecurity('x-auth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'User object created' })
  @ApiBadRequestResponse({ description: 'Bad request: Try again' })
  create(
    @Body() createUserDto: CreateUserDto,
    @CurrentUser() userAccssToken: JwtPayload,
  ) {
    return this.usersService.create(createUserDto, userAccssToken.role);
  }

  @Get()
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
  @UseGuards(SuperAdminGuard)
  @ApiNotFoundResponse({ description: `User not found` })
  @ApiAcceptedResponse({ description: 'Delete a user with its ID' })
  @ApiBadRequestResponse({ description: `Bad request: Please try again` })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
