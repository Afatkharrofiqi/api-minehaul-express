import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from './Role';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  url?: string;

  @Column({ nullable: true })
  icon?: string;

  @Column({ default: 0 })
  order: number = 0;

  @ManyToOne(() => Menu, (menu) => menu.id, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent?: Menu;

  @ManyToMany(() => Role, (role) => role.menus)
  @JoinTable({ name: 'menu_role' })
  roles?: Role[];

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();
}
