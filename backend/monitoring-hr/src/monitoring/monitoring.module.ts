import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoringService } from './monitoring.service';
import { AuditChangeLog } from './monitoring.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditChangeLog])],
  providers: [MonitoringService],
  exports: [MonitoringService],
})
export class MonitoringModule {}
