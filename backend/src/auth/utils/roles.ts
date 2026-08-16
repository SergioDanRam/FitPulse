import { SetMetadata } from '@nestjs/common';
import { RolUserEnum } from '../../user/enum/RolUserEnum';

export const META_ROLES = 'roles';


export const Roles = (...roles: RolUserEnum[]) => SetMetadata(META_ROLES, roles);
