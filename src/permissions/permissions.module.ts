import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission } from './entities/permission.entity';
import { PermissionGroup } from 'src/permission-groups/entities/permission-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, PermissionGroup])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
