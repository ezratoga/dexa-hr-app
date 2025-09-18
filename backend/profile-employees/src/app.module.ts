import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileModule } from './profiles/v1/profiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeProfile } from './profiles/v1/profiles.entity';
import database from './config/database';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './users/v1/users.module';
import { Users } from './users/v1/users.entity';

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
        entities: [EmployeeProfile, Users],
      })
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-strong-secret-key', // Use environment variable for secret
      signOptions: { expiresIn: '1h' }, // Token expiration time
      global: true, // Makes JwtService available globally
    }),
    ProfileModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
