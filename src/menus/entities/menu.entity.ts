import { Permission } from 'src/permissions/entities/permission.entity';
import {
  Entity,
  ManyToOne,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Menu {
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

  @Column({
    unique: true,
  })
  key: string;

  @OneToMany(() => Menu, (menu) => menu.parentId)
  menus: Menu[];

  @ManyToOne(() => Menu, (menu) => menu.menus, { cascade: true })
  @JoinColumn({ name: 'parentId' })
  parentId: Menu;
}
