import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: config.get<string>('KAFKA_CLIENT_ID') || 'monitoring-hr-consumer',
        brokers: (config.get<string>('KAFKA_BROKERS') || 'localhost:9092').split(',').map(b => b.trim()),
      },
      consumer: {
        groupId: config.get<string>('KAFKA_GROUP_ID') || 'monitoring-hr-group',
      },
    },
  });

  await app.startAllMicroservices();

  app.enableCors();
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
