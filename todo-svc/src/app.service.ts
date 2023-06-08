import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTodoDto } from './dto/create_todo.dto';
import { Todo, TodoDocument } from './entities/todo.entity';

import { FindTodoDto } from './dto/find_todo.dto';
import { FindTodosDto } from './dto/find_todos.dto';
import { UpdateTodoDto } from './dto/update_todo.dto';
import { DeleteTodoDto } from './dto/delete_todo.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  async handleCreateTodo(data: CreateTodoDto) {
    const todo = new this.todoModel(data);
    await todo.save();
    return { success: true, data: todo };
  }

  async handleFindTodos(data: FindTodosDto) {
    const todos = await this.todoModel.find(data);
    return { success: true, data: todos };
  }

  async handleFindTodo(data: FindTodoDto) {
    const todo = await this.todoModel.findById(data.id);
    return { success: true, data: todo };
  }

  async handleUpdateTodo(data: UpdateTodoDto) {
    const todo = await this.todoModel.findById(data.id);
    todo.set(data);
    await todo.save();
    return { success: true, data: todo };
  }

  async handleDeleteTodo(data: DeleteTodoDto) {
    const todo = await this.todoModel.findByIdAndDelete(data.id);
    return { success: true, data: todo };
  }
}
