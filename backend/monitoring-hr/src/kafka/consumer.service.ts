import { Controller, OnModuleDestroy, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { ClientKafka, KafkaContext, Payload, MessagePattern, Ctx } from '@nestjs/microservices';
import { MonitoringService } from 'src/monitoring/monitoring.service';
import type { MonitoringChangeData } from 'src/monitoring/monitoring.service';

@Controller()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(KafkaConsumerService.name);

    constructor(
        @Inject('KAFKA_CONSUMER') private readonly kafka: ClientKafka,
        private readonly monitoringService: MonitoringService
    ) {}

    async onModuleInit() {
        await this.kafka.connect();
        this.logger.log('Kafka consumer connected successfully');
    }

    async onModuleDestroy() {
        await this.kafka.close();
        this.logger.log('Kafka consumer disconnected');
    }

    @MessagePattern('monitoring-change')
    async handleMonitoringChange(
        @Payload() data: MonitoringChangeData,
        @Ctx() context: KafkaContext,
    ) {
        console.log('saminnn')
        console.log(data)
        this.logger.log('Received monitoring-change message:', JSON.stringify(data));
        
        try {
            // Delegate business logic to the dedicated service
            await this.monitoringService.logAuditChange(data);
            
            this.logger.log('Successfully processed monitoring-change message');
            return { success: true, message: 'Monitoring change processed successfully' };
        } catch (error) {
            this.logger.error('Error processing monitoring-change message:', error);
            throw error;
        }
    }
}
