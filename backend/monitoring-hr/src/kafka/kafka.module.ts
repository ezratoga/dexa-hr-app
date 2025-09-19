import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaConsumerService } from './consumer.service';
import { MonitoringModule } from '../monitoring/monitoring.module';

@Module({
    imports: [
        ConfigModule,
        MonitoringModule,
        ClientsModule.registerAsync([
            {
                name: 'KAFKA_CONSUMER',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.KAFKA,
                    options: {
                        client: {
                            clientId: configService.get<string>('KAFKA_CLIENT_ID') || 'monitoring-hr-consumer',
                            brokers: (configService.get<string>('KAFKA_BROKERS') || 'localhost:9092')
                                .split(',')
                                .map((b) => b.trim()),
                        },
                        consumer: {
                            groupId: configService.get<string>('KAFKA_GROUP_ID') || 'monitoring-hr-group',
                        },
                    },
                }),
            },
        ]),
    ],
    controllers: [KafkaConsumerService],
    providers: [],
    exports: [ClientsModule],
})
export class KafkaModule {}
