import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'uuid',
  })
  user_id: number;

  @Column({
    type: 'uuid',
  })
  role_id: number;

  @Column({
    type: 'timestamp without time zone',
  })
  assigned_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
