import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTodoDto } from '../todo/dtos/create-todo.dto';

@Injectable()
export class RabbitmqService {
  constructor(@Inject('TODO') private client: ClientProxy) {}
  createTodo(body: CreateTodoDto) {
    return this.client.emit('todo', body);
  }
}
