import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import database from './config/database';
import { SummaryModule } from './summary-all/summary.module';
import { JwtModule } from '@nestjs/jwt';
import { KafkaModule } from './kafka/kafka.module';
import { AuditChangeLog } from './monitoring/monitoring.entity';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        schema: configService.get<string>('database.schema') || 'public',
        entities: [AuditChangeLog],
      })
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-strong-secret-key', // Use environment variable for secret
      signOptions: { expiresIn: '1h' }, // Token expiration time
      global: true, // Makes JwtService available globally
    }),
    MonitoringModule,
    SummaryModule,
    KafkaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
