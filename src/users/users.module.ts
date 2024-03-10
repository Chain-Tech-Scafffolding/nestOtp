import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { EmailModule } from 'src/email/email.module';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'User', schema: UserSchema
  }]), QueueModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
