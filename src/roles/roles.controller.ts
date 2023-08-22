import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  NotFoundException,
  ValidationPipe,
  UsePipes,
  Req,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FilterRoleDto } from './dto/filter-role.dto';
import { Role } from './entities/role.entity';

@ApiTags('Role')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UsePipes(ValidationPipe)
  @Get()
  async findAll(@Query() query: FilterRoleDto): Promise<any> {
    return await this.rolesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Role> {
    const role = await this.rolesService.findOne(id);
    if (!role) {
      throw new NotFoundException('Role does not exist!');
    } else {
      return role;
    }
  }

  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Req() req: any, @Body() role: CreateRoleDto): Promise<Role> {
    return await this.rolesService.create({ ...role, createdBy: req.user.id });
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() role: UpdateRoleDto,
  ): Promise<Role> {
    const roleIdExist = await this.rolesService.findOne(id);
    if (!roleIdExist) {
      throw new NotFoundException('Role does not exist!');
    }

    return await this.rolesService.update(id, {
      ...role,
      updatedBy: req.user.id,
    });
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    const role = await this.rolesService.findOne(id);
    if (!role) {
      throw new NotFoundException('Role does not exist!');
    }
    return await this.rolesService.delete(id);
  }
}
