import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Payload } from './payload';
import { UserService } from '../user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: Payload) {
    const { id } = payload;

    const user = await this.userService.findOne(id);

    if (!user.state) throw new ForbiddenException('Usuario inactivo, contacte a su administrador');

    return {
      id: user.id,
      rol: user.rol,
    };
  }
}
