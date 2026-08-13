import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { RolUserEnum } from "../enum/RolUserEnum";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsEnum(RolUserEnum)
    @IsOptional()
    rol?: RolUserEnum;

    @IsBoolean()
    @IsOptional()
    state?: boolean;


}
