import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRolesModule } from './user-roles/user-roles.module';
import { UsersModule } from './users/users.module';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PermissionGroupsModule } from './permission-groups/permission-groups.module';
import { MenusModule } from './menus/menus.module';
import { PermissionAssignLogModule } from './permission_assign_log/permission_assign_log.module';
import { dataSourceOptions } from './config/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    UserRolesModule,
    RolePermissionsModule,
    PermissionsModule,
    PermissionGroupsModule,
    MenusModule,
    PermissionAssignLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
