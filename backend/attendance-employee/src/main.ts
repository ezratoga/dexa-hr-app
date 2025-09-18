import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // strips properties not in DTO
      forbidNonWhitelisted: true, // throws error if extra fields are sent
      transform: true,        // auto-transform payloads to DTO classes
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
