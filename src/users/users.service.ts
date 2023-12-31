import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(query: FilterUserDto): Promise<any> {
    const page = Number(query.page) || 1;
    const itemPerPage = Number(query.item_per_page) || 10;
    const skip = (page - 1) * itemPerPage;

    const keyword = query.search || '';
    const [res, total] = await this.userRepository.findAndCount({
      where: [
        { email: query.email || Like(`%${keyword}%`) },
        { email: query.email, firstName: Like(`%${keyword}%`) },
        { email: query.email, lastName: Like(`%${keyword}%`) },
        { email: query.email, globalId: Like(`%${keyword}%`) },
        { email: query.email, officeCode: Like(`%${keyword}%`) },
        { email: query.email, country: Like(`%${keyword}%`) },
      ],
      order: { createdAt: 'DESC' },
      take: itemPerPage,
      skip,
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'globalId',
        'officeCode',
        'country',
        'updatedBy',
        'updatedAt',
        'createdAt',
      ],
      relations: {
        updatedByUser: true,
        userRoles: true,
      },
    });

    const lastPage = Math.ceil(total / itemPerPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      prevPage,
    };
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: {
        updatedByUser: true,
        userRoles: true,
      },
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    const userExist = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (userExist) {
      throw new HttpException('Email existed!', HttpStatus.CONFLICT);
    }

    const hashPassword = await this.hashPassword(user.password);
    return await this.userRepository.save({
      ...user,
      password: hashPassword,
    });
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    const userExist = await this.userRepository.findOne({ where: { id } });

    if (user.email && user.email !== userExist.email) {
      const userEmailExist = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (userEmailExist) {
        throw new HttpException('Email existed!', HttpStatus.CONFLICT);
      }
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

  async delete(id: string): Promise<string> {
    await this.userRepository.delete(id);
    return `Deleted id=${id} successfully!`;
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
