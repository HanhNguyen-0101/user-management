import { PermissionGroup } from 'src/permission-groups/entities/permission-group.entity';
import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  name: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
  })
  createdAt: Date;

  @Column('text')
  description: string;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp without time zone',
  })
  deletedAt: Date;

  @Column()
  code: string;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  permissionGroupId: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  rolePermissions: RolePermission[];

  @ManyToOne(() => PermissionGroup)
  @JoinColumn({ name: 'permissionGroupId' })
  permissionGroup: PermissionGroup;
}
