import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        globalId: true,
        officeCode: true,
        country: true,
        updatedBy: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async create(user: CreateUserDto): Promise<User> {
    const hashPassword = await this.hashPassword(user.password);
    return await this.userRepository.save({ ...user, password: hashPassword });
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    const userExist = await this.userRepository.findOne({ where: { id } });
    if (!userExist) {
      throw new HttpException('UserID is not exist', HttpStatus.BAD_REQUEST);
    }

    const isPasswordMatching = await bcrypt.compare(
      user.password,
      userExist.password,
    );
    if (!isPasswordMatching) {
      const hashPassword = await this.hashPassword(user.password);
      Object.assign(user, {
        password: hashPassword,
      });
    } else {
      Object.assign(user, {
        password: userExist.password,
      });
    }

    await this.userRepository.update(id, user);
    return await this.userRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
