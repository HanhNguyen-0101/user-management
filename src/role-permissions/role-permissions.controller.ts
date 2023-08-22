import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { RolesService } from 'src/roles/roles.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { FilterRolePermissionDto } from './dto/filter-role-permission.dto';
import { FindCompositeKeyRolePermissionDto } from './dto/find-composite-key-role-permission.dto';
import { RolePermission } from './entities/role-permission.entity';

@ApiTags('Role Permission')
@ApiBearerAuth()
@Controller('role-permissions')
export class RolePermissionsController {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
    private readonly rolesService: RolesService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @UsePipes(ValidationPipe)
  @Get()
  async findAll(@Query() query: FilterRolePermissionDto): Promise<any> {
    return await this.rolePermissionsService.findAll(query);
  }

  @UsePipes(ValidationPipe)
  @Get(':role_id/:permission_id')
  async findOne(
    @Param()
    params: FindCompositeKeyRolePermissionDto,
  ): Promise<RolePermission> {
    const rolePermission = await this.rolePermissionsService.findOne(params);
    if (!rolePermission) {
      throw new NotFoundException('rolePermission does not exist!');
    } else {
      return rolePermission;
    }
  }

  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(
    @Body() createRolePermissionDto: CreateRolePermissionDto,
  ): Promise<RolePermission> {
    const permission = await this.permissionsService.findOne(
      createRolePermissionDto.permissionId,
    );
    const role = await this.rolesService.findOne(
      createRolePermissionDto.roleId,
    );
    if (!permission) {
      throw new NotAcceptableException('PermissionID does not exist!');
    }
    if (!role) {
      throw new NotAcceptableException('RoleID does not exist!');
    }
    return await this.rolePermissionsService.create(createRolePermissionDto);
  }

  @UsePipes(ValidationPipe)
  @Put(':role_id/:permission_id')
  async update(
    @Param() params: FindCompositeKeyRolePermissionDto,
    @Body() updateRolePermissionDto: UpdateRolePermissionDto,
  ) {
    const rolePermission = await this.rolePermissionsService.findOne(params);
    if (!rolePermission) {
      throw new NotFoundException('RolePermissionID does not exist!');
    }
    if (updateRolePermissionDto.roleId) {
      const role = await this.rolesService.findOne(
        updateRolePermissionDto.roleId,
      );
      if (!role) {
        throw new NotAcceptableException('RoleID does not exist!');
      }
    }
    if (updateRolePermissionDto.permissionId) {
      const permission = await this.permissionsService.findOne(
        updateRolePermissionDto.permissionId,
      );
      if (!permission) {
        throw new NotAcceptableException('PermissionID does not exist!');
      }
    }
    return await this.rolePermissionsService.update(
      params,
      updateRolePermissionDto,
    );
  }

  @UsePipes(ValidationPipe)
  @Delete(':role_id/:permission_id')
  async delete(
    @Param() params: FindCompositeKeyRolePermissionDto,
  ): Promise<any> {
    const recordExist = await this.rolePermissionsService.findOne(params);
    if (!recordExist) {
      throw new NotFoundException('Record does not exist!');
    }
    return await this.rolePermissionsService.delete(params);
  }
}
