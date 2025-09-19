import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditChangeLog } from './monitoring.entity';

export interface MonitoringChangeData {
  employee_id: number;
  phone?: string;
  photo?: string;
  password?: string;
  user_id?: string;
}

@Injectable()
export class MonitoringService {
  private readonly logger = new Logger(MonitoringService.name);

  constructor(
    @InjectRepository(AuditChangeLog)
    private readonly auditRepository: Repository<AuditChangeLog>,
  ) {}

  public async logAuditChange(data: MonitoringChangeData): Promise<void> {
    try {
      if (data.employee_id) {
        const auditLog = this.auditRepository.create({
          employee_id: data.employee_id,
          changes: data,
        });

        await this.auditRepository.save(auditLog);
        this.logger.log(`Audit log created for employee ${data.employee_id}`);
      } else {
        this.logger.warn('No employee_id found in monitoring change data, skipping audit log');
      }
    } catch (error) {
      this.logger.error(`Error logging audit change: ${error.message}`, error.stack);
    }
  }
}
