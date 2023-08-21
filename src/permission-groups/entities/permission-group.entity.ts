import { Permission } from 'src/permissions/entities/permission.entity';
import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class PermissionGroup {
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

  @DeleteDateColumn({
    type: 'timestamp without time zone',
  })
  deletedAt: Date;

  @OneToMany(() => Permission, (permission) => permission.permissionGroupId)
  permissions: Permission[];
}
