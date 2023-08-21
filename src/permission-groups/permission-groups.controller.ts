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
  UseGuards,
  Query,
  ParseUUIDPipe,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionGroupsService } from './permission-groups.service';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FilterPermissionGroupDto } from './dto/filter-permission-group.dto';
import { PermissionGroup } from './entities/permission-group.entity';

@ApiTags('Permission Group')
@ApiBearerAuth()
@Controller('permission-groups')
export class PermissionGroupsController {
  constructor(
    private readonly permissionGroupsService: PermissionGroupsService,
  ) {}

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: FilterPermissionGroupDto): Promise<any> {
    return await this.permissionGroupsService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PermissionGroup> {
    const permissionGroup = await this.permissionGroupsService.findOne(id);
    if (!permissionGroup) {
      throw new NotFoundException('PermissionGroup does not exist!');
    } else {
      return permissionGroup;
    }
  }

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(
    @Body() permissionGroup: CreatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    return await this.permissionGroupsService.create(permissionGroup);
  }

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePermissionGroupDto: UpdatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    const permissionGroupIdExist =
      await this.permissionGroupsService.findOne(id);
    if (!permissionGroupIdExist) {
      throw new NotAcceptableException('Name existed!');
    }
    return await this.permissionGroupsService.update(
      id,
      updatePermissionGroupDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    const permissionGroup = await this.permissionGroupsService.findOne(id);
    if (!permissionGroup) {
      throw new NotFoundException('PermissionGroup does not exist!');
    }
    return await this.permissionGroupsService.delete(id);
  }
}
