import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
} from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { ApiBody } from '@nestjs/swagger';
import { catchError, lastValueFrom, throwError } from 'rxjs';

@Controller('todo')
export class TodoController implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('TODO_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    const requestPatterns = [
      'todo.create',
      'todo.find',
      'todo.find.one',
      'todo.update',
      'todo.delete',
    ];

    requestPatterns.forEach((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    });

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @ApiBody({ type: 'object' })
  @Post()
  async create(@Body() data: Record<string, unknown>) {
    return lastValueFrom(this.client.send('todo.create', data));
  }

  @Get()
  async find(@Query() data: Record<string, unknown>) {
    return lastValueFrom(this.client.send('todo.find', data));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return lastValueFrom(this.client.send('todo.find.one', { id }));
  }

  @ApiBody({ type: 'object' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Record<string, unknown>) {
    return lastValueFrom(this.client.send('todo.update', { id, ...data }));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return lastValueFrom(this.client.send('todo.delete', { id }));
  }

  @Patch(':id/complete')
  async markComplete(@Param('id') id: string) {
    return lastValueFrom(
      this.client.send('todo.update', { id, completed: true }),
    );
  }

  @Patch(':id/incomplete')
  async markIncomplete(@Param('id') id: string) {
    return lastValueFrom(
      this.client.send('todo.update', { id, completed: false }),
    );
  }
}
