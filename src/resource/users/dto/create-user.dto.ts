import { IsEmail, IsNotEmpty, IsStrongPassword, isStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    lastName: string;
    @IsNotEmpty()
    phone: string;
    @IsNotEmpty()
    @IsStrongPassword()
    password: string
}
