import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { FilterMenuDto } from './dto/filter-menu.dto';

@ApiTags('Menu')
@ApiBearerAuth()
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @UsePipes(ValidationPipe)
  @Get()
  async findAll(@Query() query: FilterMenuDto): Promise<any> {
    return await this.menusService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Menu> {
    const menu = await this.menusService.findOne(id);
    if (!menu) {
      throw new NotFoundException('Menu does not exist!');
    } else {
      return menu;
    }
  }

  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() menu: CreateMenuDto): Promise<Menu> {
    return await this.menusService.create(menu);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() menu: UpdateMenuDto,
  ): Promise<Menu> {
    const menuIdExist = await this.menusService.findOne(id);
    if (!menuIdExist) {
      throw new NotFoundException('Menu does not exist!');
    }

    return await this.menusService.update(id, menu);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    const menu = await this.menusService.findOne(id);
    if (!menu) {
      throw new NotFoundException('Menu does not exist!');
    }
    return await this.menusService.delete(id);
  }
}
