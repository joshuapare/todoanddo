import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() data: Record<string, unknown>) {
    return this.todoService.create(data);
  }

  @Get()
  async find(@Param() data: Record<string, unknown>) {
    return this.todoService.find(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Param() data: Record<string, unknown>,
  ) {
    return this.todoService.find({ id, ...data });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Record<string, unknown>) {
    return this.todoService.update({ id, ...data });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
