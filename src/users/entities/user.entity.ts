import { UserRole } from 'src/user-roles/entities/user-role.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    default: false,
  })
  is_pending: boolean;

  @Column({
    default: false,
  })
  is_disable: boolean;

  @Column({
    type: 'timestamp without time zone',
  })
  created_at: Date;

  @Column({
    type: 'timestamp without time zone',
  })
  updated_at: Date;

  @Column({
    type: 'uuid',
  })
  updated_by: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  global_id: string;

  @Column()
  office_code: string;

  @Column()
  country: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user_id)
  userRoles: UserRole[];
}
