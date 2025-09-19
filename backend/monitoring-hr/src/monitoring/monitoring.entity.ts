import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'audit_change_log'})
export class AuditChangeLog {
  @PrimaryColumn({ type: 'int4', nullable: false })
  employee_id: number;

  @Column({ type: 'json', nullable: true })
  changes: Record<string, any> | null;

  @PrimaryColumn({ type: 'timestamp', nullable: false })
  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedat: Date;
}
