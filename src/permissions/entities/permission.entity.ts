import { PermissionGroup } from 'src/permission-groups/entities/permission-group.entity';
import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    type: 'timestamp without time zone',
  })
  createdAt: Date;

  @Column('text')
  description: string;

  @Column({
    type: 'timestamp without time zone',
  })
  updatedAt: Date;

  @Column({
    type: 'timestamp without time zone',
  })
  deletedAt: Date;

  @Column()
  code: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  rolePermissions: RolePermission[];

  @ManyToOne(
    () => PermissionGroup,
    (permissionGroup) => permissionGroup.permissions,
    { cascade: true },
  )
  @JoinColumn({ name: 'permissionGroupId' })
  permissionGroupId: PermissionGroup;
}
