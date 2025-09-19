import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaProducerService } from './producer.service';

@Module({
    imports: [
        ConfigModule,
        ClientsModule.registerAsync([
            {
                name: 'KAFKA_PRODUCER',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.KAFKA,
                    options: {
                        client: {
                            clientId: configService.get<string>('KAFKA_CLIENT_ID') || 'profile-employees',
                            brokers: (configService.get<string>('KAFKA_BROKERS') || 'localhost:9092')
                                .split(',')
                                .map((b) => b.trim()),
                        },
                        producerOnlyMode: true,
                    },
                }),
            },
        ]),
    ],
    providers: [KafkaProducerService],
    exports: [ClientsModule, KafkaProducerService],
})
export class KafkaModule {}


