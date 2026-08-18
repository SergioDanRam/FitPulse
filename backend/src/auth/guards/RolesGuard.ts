import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../user/entities/user.entity';
import { META_ROLES } from '../utils/roles';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(META_ROLES, context.getHandler());

    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    const userRole = roles.includes(user.rol);

    if (!user || !user.rol) return false;

    return userRole;
  }
}
