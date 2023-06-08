import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

import { RpcValidationFilter } from './pipes/validation-filter.pipe';

import { CreateTodoDto } from './dto/create_todo.dto';
import { FindTodoDto } from './dto/find_todo.dto';
import { FindTodosDto } from './dto/find_todos.dto';
import { UpdateTodoDto } from './dto/update_todo.dto';
import { DeleteTodoDto } from './dto/delete_todo.dto';

@UseFilters(new RpcValidationFilter())
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('todo.create')
  async handleCreateTodo(data: CreateTodoDto) {
    return this.appService.handleCreateTodo(data);
  }

  @MessagePattern('todo.find')
  async handleFindTodos(data: FindTodosDto) {
    return this.appService.handleFindTodos(data);
  }

  @MessagePattern('todo.find.one')
  async handleFindTodo(data: FindTodoDto) {
    return this.appService.handleFindTodo(data);
  }

  @MessagePattern('todo.update')
  async handleUpdateTodo(data: UpdateTodoDto) {
    return this.appService.handleUpdateTodo(data);
  }

  @MessagePattern('todo.delete')
  async handleDeleteTodo(data: DeleteTodoDto) {
    return this.appService.handleDeleteTodo(data);
  }
}
