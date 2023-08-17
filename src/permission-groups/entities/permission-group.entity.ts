import { Permission } from 'src/permissions/entities/permission.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PermissionGroup {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    length: 255,
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

  @Column({
    type: 'timestamp without time zone',
  })
  deletedAt: Date;

  @OneToMany(() => Permission, (permission) => permission.permissionGroupId)
  permissions: Permission[];
}
