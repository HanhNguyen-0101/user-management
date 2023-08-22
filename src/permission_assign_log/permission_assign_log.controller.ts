import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionAssignLogService } from './permission_assign_log.service';
import { CreatePermissionAssignLogDto } from './dto/create-permission_assign_log.dto';
import { UpdatePermissionAssignLogDto } from './dto/update-permission_assign_log.dto';

@Controller('permission-assign-log')
export class PermissionAssignLogController {
  constructor(
    private readonly permissionAssignLogService: PermissionAssignLogService,
  ) {}

  @Post()
  create(@Body() createPermissionAssignLogDto: CreatePermissionAssignLogDto) {
    return this.permissionAssignLogService.create(createPermissionAssignLogDto);
  }

  @Get()
  findAll() {
    return this.permissionAssignLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionAssignLogService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionAssignLogDto: UpdatePermissionAssignLogDto,
  ) {
    return this.permissionAssignLogService.update(
      +id,
      updatePermissionAssignLogDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionAssignLogService.remove(+id);
  }
}
