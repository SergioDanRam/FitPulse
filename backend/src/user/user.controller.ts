import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/JWTAuthGuard';
import { RolesGuard } from '../auth/guards/RolesGuard';
import { Roles } from '../auth/utils/roles';
import { RolUserEnum } from './enum/RolUserEnum';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from './entities/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @Roles(RolUserEnum.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(RolUserEnum.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(RolUserEnum.ADMIN)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  @Auth(RolUserEnum.ADMIN, RolUserEnum.PARTNER)
  remove(
    @Param('id') id: string,
    @GetUser() user: User
  ) {
    return this.userService.remove(id, user);
  }
}
