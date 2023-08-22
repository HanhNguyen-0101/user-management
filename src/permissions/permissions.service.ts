import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { FilterPermissionDto } from './dto/filter-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { IsNull, Like, Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async findAll(query: FilterPermissionDto): Promise<any> {
    const page = Number(query.page) || 1;
    const itemPerPage = Number(query.item_per_page) || 10;
    const skip = (page - 1) * itemPerPage;
    const keyword = query.search || '';

    const [res, total] = await this.permissionRepository.findAndCount({
      where: [
        { name: Like(`%${keyword}%`) },
        { description: Like(`%${keyword}%`) },
        { code: Like(`%${keyword}%`) },
      ],
      order: { createdAt: 'DESC' },
      take: itemPerPage,
      skip,
      relations: {
        rolePermissions: true,
        permissionGroup: true,
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

  async findOne(id: string): Promise<Permission> {
    return await this.permissionRepository.findOne({
      where: { id },
      relations: {
        rolePermissions: true,
        permissionGroup: true,
      },
    });
  }

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permissionExist = await this.permissionRepository.findOne({
      where: {
        name: createPermissionDto.name,
        deletedAt: IsNull(),
      },
    });
    if (permissionExist) {
      throw new HttpException('Name existed!', HttpStatus.CONFLICT);
    }
    return await this.permissionRepository.save(createPermissionDto);
  }

  async update(
    id: string,
    permission: UpdatePermissionDto,
  ): Promise<Permission> {
    // Check Permission Name isn't dupplicate
    const permissionIdExist = await this.permissionRepository.findOne({
      where: { id },
    });
    if (permission.name && permission.name !== permissionIdExist.name) {
      const permissionNameExist = await this.permissionRepository.findOne({
        where: {
          name: permission.name,
        },
      });
      if (permissionNameExist) {
        throw new HttpException('Name existed!', HttpStatus.CONFLICT);
      }
    }

    await this.permissionRepository.update(id, permission);
    return await this.permissionRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<string> {
    await this.permissionRepository.softDelete(id);
    return `Deleted id=${id} successfully!`;
  }
}
