import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';
import { UserRole } from 'src/user-roles/entities/user-role.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
    unique: true,
  })
  name: string;

  @Column({
    type: 'timestamp without time zone',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp without time zone',
  })
  updatedAt: Date;

  @Column('uuid')
  createdBy: number;

  @Column('uuid')
  updatedBy: number;

  @Column('text')
  description: string;

  @Column({
    type: 'timestamp without time zone',
  })
  deletedAt: Date;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermission[];
}
