import { Injectable } from '@nestjs/common';
import { CreatePermissionAssignLogDto } from './dto/create-permission_assign_log.dto';
import { UpdatePermissionAssignLogDto } from './dto/update-permission_assign_log.dto';

@Injectable()
export class PermissionAssignLogService {
  create(createPermissionAssignLogDto: CreatePermissionAssignLogDto) {
    return 'This action adds a new permissionAssignLog';
  }

  findAll() {
    return `This action returns all permissionAssignLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permissionAssignLog`;
  }

  update(
    id: number,
    updatePermissionAssignLogDto: UpdatePermissionAssignLogDto,
  ) {
    return `This action updates a #${id} permissionAssignLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissionAssignLog`;
  }
}
