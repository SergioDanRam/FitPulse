import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolUserEnum } from './enum/RolUserEnum';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from './entities/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @Auth(RolUserEnum.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Auth(RolUserEnum.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Auth(RolUserEnum.ADMIN)
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

  @Patch(':id/state')
  @Auth(RolUserEnum.ADMIN, RolUserEnum.PARTNER)
  changeState(@Param('id') id: string) {
    return this.userService.changeState(id)
  }
}
