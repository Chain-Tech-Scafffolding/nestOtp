import { Body, Controller, Post } from '@nestjs/common';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(
    private rabbitmqService: RabbitmqService,
    private todoService: TodoService,
  ) {}
  @Post()
  createTodo(@Body() body: CreateTodoDto) {
    return this.rabbitmqService.createTodo(body);
  }

  @EventPattern('todo')
  handleOrderPlaced(@Payload() order: CreateTodoDto) {
    return this.todoService.handleOrderPlaced(order);
  }
}
