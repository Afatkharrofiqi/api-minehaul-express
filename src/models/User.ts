import * as bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Group } from './Group';
import { Permission } from './Permission';
import { Role } from './Role';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ select: false }) // Password is hidden by default
  password!: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password: string): Promise<boolean> {
    console.log({ passdb: this.password });
    return await bcrypt.compare(password, this.password);
  }

  @Column({ unique: true })
  email?: string;

  @CreateDateColumn()
  created_at: Date = new Date();

  @UpdateDateColumn()
  updated_at: Date = new Date();

  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable({ name: 'user_group' })
  groups?: Group[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_role' })
  roles?: Role[];

  @ManyToMany(() => Permission, (permission) => permission.users)
  @JoinTable({ name: 'user_permission' })
  permissions?: Permission[];
}
