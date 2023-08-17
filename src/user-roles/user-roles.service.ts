import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from './entities/user-role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    const newUserRole = this.userRoleRepository.create(createUserRoleDto);
    return this.userRoleRepository.save(newUserRole);
  }

  async findAll(): Promise<UserRole[]> {
    return this.userRoleRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} userRole`;
  }

  update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return `This action updates a #${id} ${updateUserRoleDto}userRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRole`;
  }
}
