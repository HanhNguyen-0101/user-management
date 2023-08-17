import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  roleId: number;

  @PrimaryGeneratedColumn('uuid')
  permissionId: number;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
  permission: Permission;

  @ManyToOne(() => Role, (role) => role.rolePermissions)
  role: Role;
}
