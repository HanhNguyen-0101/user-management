import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Like, Repository } from 'typeorm';
import { FilterMenuDto } from './dto/filter-menu.dto';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async findAll(query: FilterMenuDto): Promise<any> {
    const page = Number(query.page) || 1;
    const itemPerPage = Number(query.item_per_page) || 10;
    const skip = (page - 1) * itemPerPage;
    const keyword = query.search || '';

    const [res, total] = await this.menuRepository.findAndCount({
      where: [{ key: query.key, name: Like(`%${keyword}%`) }],
      order: { createdAt: 'DESC' },
      take: itemPerPage,
      skip,
      relations: {
        parentMenu: true,
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

  async findOne(id: string): Promise<Menu> {
    return await this.menuRepository.findOne({
      where: { id },
      relations: {
        parentMenu: true,
      },
    });
  }

  async create(menu: CreateMenuDto): Promise<Menu> {
    const menuExist = await this.menuRepository.findOne({
      where: {
        key: menu.key,
      },
    });
    if (menuExist) {
      throw new HttpException('Key existed!', HttpStatus.CONFLICT);
    }

    if (menu.parentId) {
      const menuParentExist = await this.menuRepository.findOne({
        where: { parentId: menu.parentId },
      });
      if (!menuParentExist) {
        throw new HttpException(
          'MenuParent hasnt existed!',
          HttpStatus.CONFLICT,
        );
      }
    }

    return await this.menuRepository.save(menu);
  }

  async update(id: string, menu: UpdateMenuDto): Promise<Menu> {
    const menuIdExist = await this.menuRepository.findOne({
      where: { id },
    });
    if (menu.key && menu.key !== menuIdExist.key) {
      const menuKeyExist = await this.menuRepository.findOne({
        where: { key: menu.key },
      });
      if (menuKeyExist) {
        throw new HttpException('Key existed!', HttpStatus.CONFLICT);
      }
    }
    if (menu.parentId) {
      const menuParentExist = await this.menuRepository.findOne({
        where: { parentId: menu.parentId },
      });
      if (!menuParentExist) {
        throw new HttpException(
          'MenuParent hasnt existed!',
          HttpStatus.CONFLICT,
        );
      }
    }
    await this.menuRepository.update(id, menu);
    return await this.menuRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<string> {
    await this.menuRepository.softDelete(id);
    return `Deleted id=${id} successfully!`;
  }
}
