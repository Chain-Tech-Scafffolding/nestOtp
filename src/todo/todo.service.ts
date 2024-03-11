import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Injectable()
export class TodoService {
  handleOrderPlaced(order: CreateTodoDto) {
    console.log('recieved new order', order);
  }
}
