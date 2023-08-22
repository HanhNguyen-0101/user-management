import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionAssignLogDto } from './create-permission_assign_log.dto';

export class UpdatePermissionAssignLogDto extends PartialType(
  CreatePermissionAssignLogDto,
) {}
