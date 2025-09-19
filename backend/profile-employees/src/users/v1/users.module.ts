import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { EmployeeProfile } from 'src/profiles/v1/profiles.entity';
import { AuthMiddleware } from 'src/utils/auth/middleware';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users, EmployeeProfile]), KafkaModule],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'users/v1/update-user', method: RequestMethod.PUT },
        { path: 'users/v1/all-users', method: RequestMethod.GET }
      )
  }
}
