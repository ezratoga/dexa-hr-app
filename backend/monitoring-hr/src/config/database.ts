// src/config/database.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'user1',
  password: process.env.DB_PASSWORD || 'xxxxxxxxxxxxxxxx',
  database: process.env.DB_NAME || 'profile',
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
}));
