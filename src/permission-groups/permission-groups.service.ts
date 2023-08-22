import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionGroup } from './entities/permission-group.entity';
import { IsNull, Like, Repository } from 'typeorm';
import { FilterPermissionGroupDto } from './dto/filter-permission-group.dto';

@Injectable()
export class PermissionGroupsService {
  constructor(
    @InjectRepository(PermissionGroup)
    private permissionGroupRepository: Repository<PermissionGroup>,
  ) {}
  async findAll(query: FilterPermissionGroupDto): Promise<any> {
    const page = Number(query.page) || 1;
    const itemPerPage = Number(query.item_per_page) || 10;
    const skip = (page - 1) * itemPerPage;

    const keyword = query.search || '';
    const [res, total] = await this.permissionGroupRepository.findAndCount({
      where: { name: Like(`%${keyword}%`) },
      order: { createdAt: 'DESC' },
      take: itemPerPage,
      skip,
      select: ['id', 'name', 'updatedAt', 'createdAt', 'deletedAt'],
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

  async findOne(id: string): Promise<PermissionGroup> {
    return await this.permissionGroupRepository.findOne({
      where: { id },
    });
  }

  async create(
    permissionGroup: CreatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    const permissionGroupExist = await this.permissionGroupRepository.findOne({
      where: {
        name: permissionGroup.name,
        deletedAt: IsNull(),
      },
    });
    if (permissionGroupExist) {
      throw new HttpException('Name existed!', HttpStatus.CONFLICT);
    }
    return await this.permissionGroupRepository.save(permissionGroup);
  }

  async update(
    id: string,
    permissionGroup: UpdatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    const permissionGroupIdExist = await this.permissionGroupRepository.findOne(
      {
        where: { id },
      },
    );
    if (
      permissionGroup.name &&
      permissionGroup.name !== permissionGroupIdExist.name
    ) {
      const permissionGroupNameExist =
        await this.permissionGroupRepository.findOne({
          where: {
            name: permissionGroup.name,
          },
        });
      if (permissionGroupNameExist) {
        throw new HttpException('Name existed!', HttpStatus.CONFLICT);
      }
    }

    await this.permissionGroupRepository.update(id, permissionGroup);
    return await this.permissionGroupRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<string> {
    await this.permissionGroupRepository.softDelete(id);
    return `Deleted id=${id} successfully!`;
  }
}
