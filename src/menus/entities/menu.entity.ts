import {
  Entity,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Menu {
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

  @UpdateDateColumn({
    type: 'timestamp without time zone',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp without time zone',
  })
  deletedAt: Date;

  @Column({
    unique: true,
  })
  key: string;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  parentId: string;

  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'parentId' })
  parentMenu: Menu;
}
