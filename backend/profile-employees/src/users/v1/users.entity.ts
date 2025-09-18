// src/employee-profile/entities/employee-profile.entity.ts

import { EmployeeProfile } from 'src/profiles/v1/profiles.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ schema: 'employee', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  user_id: string;

  @PrimaryGeneratedColumn({ name: 'employee_id' })
  employee_id: number;

  @PrimaryColumn({ type: 'varchar' })
  email?: string;

  @Column({ type: 'varchar', nullable: true })
  password?: string;

  @Column({ type: 'varchar', array: true, nullable: true, name: 'lastlogin' })
  lastlogin?: string[];

  @Column({ type: 'varchar', nullable: true, name: 'phone' })
  phone?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedat: Date;

  @OneToOne(() => EmployeeProfile, profile => profile.user)
  @JoinColumn({ name: 'employee_id', referencedColumnName: 'employee_id' })
  profile: EmployeeProfile;
}
