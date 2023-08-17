import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionAssignLogService } from './permission_assign_log.service';
import { PermissionAssignLogController } from './permission_assign_log.controller';
import { PermissionAssignLog } from './entities/permission_assign_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionAssignLog])],
  controllers: [PermissionAssignLogController],
  providers: [PermissionAssignLogService],
})
export class PermissionAssignLogModule {}
