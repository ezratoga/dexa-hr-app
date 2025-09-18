// src/employee-profile/entities/employee-profile.entity.ts

import { Users } from 'src/users/v1/users.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity({ schema: 'employee', name: 'employee_profile' })
export class EmployeeProfile {
  @PrimaryColumn({ type: 'varchar' })
  user_id: string;

  @PrimaryColumn({ type: 'int' })
  employee_id: number;

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'varchar', nullable: true })
  position?: string;

  @Column({ type: 'varchar', nullable: true })
  photo?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedat: Date;

  @OneToOne(() => Users, user => user.profile)
  user: Users;
}
