import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerUserDto: RegisterUserDto) {

    const user = await this.userService.create(registerUserDto);

    return {
      message: 'Usuario registrado correctamente!',
      user,
    };
  }

  async login(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto;

    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      throw new UnauthorizedException('Credenciales incorrectas');

    const token = this.jwtService.sign({ id: user.id });

    return {
      token,
      message: 'Usuario logueado correctamente',
    }

  }
}
