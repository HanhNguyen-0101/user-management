import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseUUIDPipe,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  NotAcceptableException,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FilterUserRoleDto } from './dto/filter-user-role.dto';
import { UserRole } from './entities/user-role.entity';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';

@ApiTags('User Role')
@ApiBearerAuth()
@Controller('user-roles')
export class UserRolesController {
  constructor(
    private readonly userRolesService: UserRolesService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: FilterUserRoleDto): Promise<any> {
    return await this.userRolesService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<UserRole> {
    const userRole = await this.userRolesService.findOne(id);
    if (!userRole) {
      throw new NotFoundException('UserRole does not exist!');
    } else {
      return userRole;
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
    @Body() createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRole> {
    const user = await this.usersService.findOne(createUserRoleDto.userId);
    const role = await this.rolesService.findOne(createUserRoleDto.roleId);
    if (!user) {
      throw new NotAcceptableException('UserID does not exist!');
    }
    if (!role) {
      throw new NotAcceptableException('RoleID does not exist!');
    }
    return await this.userRolesService.create(createUserRoleDto);
  }

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    const userRole = await this.userRolesService.findOne(id);
    if (!userRole) {
      throw new NotFoundException('UserRoleID does not exist!');
    }
    if (updateUserRoleDto.roleId) {
      const role = await this.rolesService.findOne(updateUserRoleDto.roleId);
      if (!role) {
        throw new NotAcceptableException('RoleID does not exist!');
      }
    }
    if (updateUserRoleDto.userId) {
      const user = await this.usersService.findOne(updateUserRoleDto.userId);
      if (!user) {
        throw new NotAcceptableException('UserID does not exist!');
      }
    }
    return await this.userRolesService.update(id, updateUserRoleDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    const recordExist = await this.userRolesService.findOne(id);
    if (!recordExist) {
      throw new NotFoundException('Record does not exist!');
    }
    return await this.userRolesService.delete(id);
  }
}
