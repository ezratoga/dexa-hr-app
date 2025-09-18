import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/utils/auth/middleware';

@Module({
  imports: [],
  controllers: [SummaryController],
  providers: [SummaryService],
  exports: [SummaryService]
})
export class SummaryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(AuthMiddleware)
      .forRoutes(SummaryController)
  }
}
