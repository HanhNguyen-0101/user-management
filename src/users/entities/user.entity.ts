import { UserRole } from 'src/user-roles/entities/user-role.entity';
import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    length: 255,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  refreshToken: string;

  @Column()
  isPending: boolean;

  @Column()
  isDisable: boolean;

  @CreateDateColumn({
    type: 'timestamp without time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
  })
  updatedAt: Date;

  @Column('uuid')
  updatedBy: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  globalId: string;

  @Column()
  officeCode: string;

  @Column()
  country: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}
