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
import typeorm from './config/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UsersModule,
    UserRolesModule,
    RolePermissionsModule,
    PermissionsModule,
    PermissionGroupsModule,
    MenusModule,
    PermissionAssignLogModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
