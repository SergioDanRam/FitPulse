import { IsString, IsNotEmpty, MinLength, IsEmail } from "class-validator";

export class RegisterUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

 }
