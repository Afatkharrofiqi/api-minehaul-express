import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from './Role';
import { User } from './User';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany(() => User, (user) => user.groups)
  users?: User[];

  @ManyToMany(() => Role, (role) => role.groups)
  @JoinTable({ name: 'group_role' })
  roles?: Role[];

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();
}
