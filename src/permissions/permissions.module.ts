import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission } from './entities/permission.entity';
import { PermissionGroup } from 'src/permission-groups/entities/permission-group.entity';
import { PermissionGroupsModule } from 'src/permission-groups/permission-groups.module';

@ApiTags('Permission')
@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, PermissionGroup]),
    PermissionGroupsModule,
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
