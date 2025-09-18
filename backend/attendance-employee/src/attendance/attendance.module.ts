import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceData } from './attendance.entity';
import { AuthMiddleware } from 'src/utils/auth/middleware';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceData])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService]
})
export class AttendanceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(AuthMiddleware)
      .forRoutes(AttendanceController)
  }
}
