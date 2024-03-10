import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [RabbitmqModule, TodoModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
