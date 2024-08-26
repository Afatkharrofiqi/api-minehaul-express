import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from './Role';
import { User } from './User';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles?: Role[];

  @ManyToMany(() => User, (user) => user.permissions)
  users?: User[];

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();
}
