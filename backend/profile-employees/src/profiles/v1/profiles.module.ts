import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProfileController } from './profiles.controller';
import { ProfileService } from './profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeProfile } from './profiles.entity';
import { AuthMiddleware } from 'src/utils/auth/middleware';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeProfile])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(AuthMiddleware)
      .forRoutes(ProfileController)
  }
}
