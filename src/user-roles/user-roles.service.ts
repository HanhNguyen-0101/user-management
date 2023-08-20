import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from './entities/user-role.entity';
import { Like, Repository } from 'typeorm';
import { FilterUserRoleDto } from './dto/filter-user-role.dto';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async findAll(query: FilterUserRoleDto): Promise<any> {
    const page = Number(query.page) || 1;
    const itemPerPage = Number(query.item_per_page) || 10;
    const skip = (page - 1) * itemPerPage;

    const keyword = query.search || '';
    const [res, total] = await this.userRoleRepository.findAndCount({
      where: [
        {
          userId: query.user_id,
          roleId: query.role_id,
          user: [
            { email: Like(`%${keyword}%`) },
            { firstName: Like(`%${keyword}%`) },
            { lastName: Like(`%${keyword}%`) },
          ],
        },
        {
          userId: query.user_id,
          roleId: query.role_id,
          role: {
            name: Like(`%${keyword}%`),
          },
        },
      ],
      order: { assignedAt: 'DESC' },
      take: itemPerPage,
      skip,
      relations: {
        user: true,
        role: true,
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

  async findOne(id: string): Promise<UserRole> {
    return await this.userRoleRepository.findOne({
      where: { id },
      relations: {
        user: true,
        role: true,
      },
    });
  }

  async create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    const userRoleExist = await this.userRoleRepository.findOne({
      where: {
        userId: createUserRoleDto.userId,
        roleId: createUserRoleDto.roleId,
      },
    });
    if (userRoleExist) {
      throw new HttpException('UserRole was created!', HttpStatus.CREATED);
    } else {
      const newUserRole = this.userRoleRepository.create(createUserRoleDto);
      return this.userRoleRepository.save(newUserRole);
    }
  }

  async update(
    id: string,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRole> {
    const userRoleExist = await this.userRoleRepository.findOne({
      where: {
        userId: updateUserRoleDto.userId,
        roleId: updateUserRoleDto.roleId,
      },
    });
    if (userRoleExist) {
      throw new HttpException('UserRole was existed', HttpStatus.CREATED);
    }

    await this.userRoleRepository.update(id, updateUserRoleDto);
    return await this.userRoleRepository.findOne({
      where: { id },
    });
  }

  async delete(id: string): Promise<string> {
    await this.userRoleRepository.delete(id);
    return `Deleted id=${id} successfully!`;
  }
}
