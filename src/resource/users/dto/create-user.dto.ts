import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'enter your first name', example: 'Layi' })
  firstName: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'enter your last name', example: 'Wasabi' })
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'enter your email', example: 'doe@example.com' })
  email: string;
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your phone number',
    example: '08108017352',
    maxLength: 11,
    minLength: 11,
  })
  phone: string;
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ description: 'enter your password', example: 'password1426' })
  password: string;
}
