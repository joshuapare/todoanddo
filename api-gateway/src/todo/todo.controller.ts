import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() data: Record<string, unknown>) {
    this.todoService.create(data);
  }

  @Get()
  async find(@Query() data: Record<string, unknown>) {
    console.log('data', data);
    this.todoService.find(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query() data: Record<string, unknown>,
  ) {
    this.todoService.find({ id, ...data });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Record<string, unknown>) {
    this.todoService.update({ id, ...data });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.todoService.delete(id);
  }
}
