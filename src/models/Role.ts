import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Group } from './Group';
import { Menu } from './Menu';
import { Permission } from './Permission';
import { User } from './User';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany(() => User, (user) => user.roles)
  users?: User[];

  @ManyToMany(() => Group, (group) => group.roles)
  groups?: Group[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({ name: 'role_permission' })
  permissions?: Permission[];

  @ManyToMany(() => Menu, (menu) => menu.roles)
  menus?: Menu[];

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();
}
