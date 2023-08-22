import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';
import { UserRole } from 'src/user-roles/entities/user-role.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
    unique: true,
  })
  name: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
  })
  updatedAt: Date;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  createdBy: string;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  updatedBy: string;

  @Column('text')
  description: string;

  @DeleteDateColumn({
    type: 'timestamp without time zone',
  })
  deletedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updatedBy' })
  updatedByUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdBy' })
  createdByUser: User;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermission[];
}
