import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import database from './config/database';
import { AttendanceModule } from './attendance/attendance.module';
import { JwtModule } from '@nestjs/jwt';
import { AttendanceData } from './attendance/attendance.entity';

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
        schema: configService.get<string>('database.schema') || 'employee',
        entities: [AttendanceData],
      })
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-strong-secret-key', // Use environment variable for secret
      signOptions: { expiresIn: '1h' }, // Token expiration time
      global: true, // Makes JwtService available globally
    }),
    AttendanceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
