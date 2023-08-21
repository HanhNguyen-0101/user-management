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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FilterPermissionDto } from './dto/filter-permission.dto';
import { Permission } from './entities/permission.entity';
import { PermissionGroupsService } from 'src/permission-groups/permission-groups.service';

@ApiTags('Permission')
@ApiBearerAuth()
@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly permissionGroupService: PermissionGroupsService,
  ) {}

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: FilterPermissionDto): Promise<any> {
    return await this.permissionsService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Permission> {
    const permission = await this.permissionsService.findOne(id);
    if (!permission) {
      throw new NotFoundException('Permission does not exist!');
    } else {
      return permission;
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
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    const permissionGroup = await this.permissionGroupService.findOne(
      createPermissionDto.permissionGroupId,
    );
    if (!permissionGroup) {
      throw new NotAcceptableException('PermissionGroupID does not exist!');
    }
    return await this.permissionsService.create(createPermissionDto);
  }

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {

    // Check Permission exist
    const permissionIdExist = await this.permissionsService.findOne(id);
    if (!permissionIdExist) {
      throw new NotFoundException('permission does not exist!');
    }

    // Check permissionGroupId has existed in PermissionGroup
    if (updatePermissionDto.permissionGroupId) {
      const permissionGroup = await this.permissionGroupService.findOne(
        updatePermissionDto.permissionGroupId,
      );
      if (!permissionGroup) {
        throw new NotAcceptableException('PermissionGroupID does not exist!');
      }
    }
    return await this.permissionsService.update(id, updatePermissionDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    const permission = await this.permissionsService.findOne(id);
    if (!permission) {
      throw new NotFoundException('permission does not exist!');
    }
    return await this.permissionsService.delete(id);
  }
}
