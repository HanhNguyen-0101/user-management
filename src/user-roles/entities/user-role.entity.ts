import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @PrimaryGeneratedColumn('uuid')
  roleId: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
  })
  assignedAt: Date;

  @ManyToOne(() => User, (user) => user.userRoles, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: 'CASCADE',
  })
  role: Role;
}
