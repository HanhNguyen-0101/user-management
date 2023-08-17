import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PermissionAssignLog {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  actionPermissionLogActionType: string;

  @Column()
  changesJson: string;

  @Column({
    type: 'timestamp without time zone',
  })
  createdAt: Date;

  @Column({
    type: 'uuid',
  })
  createdBy: number;
}
