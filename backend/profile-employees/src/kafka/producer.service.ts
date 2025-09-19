import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
    constructor(@Inject('KAFKA_PRODUCER') private readonly kafka: ClientKafka) {}

    async onModuleInit() {
        await this.kafka.connect();
    }

    async onModuleDestroy() {
        await this.kafka.close();
    }

    async publish(topic: string, payload: any, key?: string, headers?: Record<string, any>) {
        return this.kafka.emit(topic, {
            key: key ?? String(payload?.id ?? ''),
            value: payload,
            headers,
        }).toPromise();
    }
}


