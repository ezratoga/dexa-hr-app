// src/employee-profile/entities/employee-profile.entity.ts

import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'employee_attendance', name: 'absence_in_out' })
export class AttendanceData {
  @PrimaryColumn({ type: 'int' })
  employee_id: number;

  @PrimaryColumn({ type: 'timestamp' })
  absence_in?: Date;

  @Column({ type: 'timestamp', nullable: true })
  absence_out?: Date;

  @Column({ type: 'varchar', nullable: true })
  work_type_in?: string;

  @Column({ type: 'varchar', nullable: true })
  work_type_out?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedat: Date;
}
