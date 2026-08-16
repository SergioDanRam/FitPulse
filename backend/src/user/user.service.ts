import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RolUserEnum } from './enum/RolUserEnum';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {

    const { email } = createUserDto;

    const userExist = await this.userRepository.findOneBy({ email });

    if (userExist)
      throw new ConflictException(' Un usuario con ese email ya existe');

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  // async update(id: string, updateUserDto: UpdateUserDto) {
  //   const user = await this.findOne(id);
  //   user
  // }

  async remove(id: string, user: User) {

    if (user.id !== id && user.rol !== RolUserEnum.ADMIN) {
      throw new ForbiddenException("No puede eliminar esta cuenta")
    }

    await this.userRepository.remove(user);
    return 'Usuario eliminado correctamente';
  }

  async changeState(id: string) {
    const user = await this.findOne(id);
    user.state = !user.state;
    await this.userRepository.save(user);
    return true;
  }
}
