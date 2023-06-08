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
import { catchError, lastValueFrom, throwError } from 'rxjs';

@Controller('todo')
export class TodoController implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('TODO_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    const requestPatterns = [
      'todo.create',
      'todo.find',
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

  @Post()
  async create(@Body() data: Record<string, unknown>) {
    return this.client
      .send('todo.create', data)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  @Get()
  async find(@Query() data: Record<string, unknown>) {
    const result = await lastValueFrom(this.client.send('todo.find', data));
    return result;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query() data: Record<string, unknown>,
  ) {
    const result = await lastValueFrom(
      this.client.send('todo.find', { id, ...data }),
    );
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Record<string, unknown>) {
    const result = await lastValueFrom(
      this.client.send('todo.update', { id, ...data }),
    );
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await lastValueFrom(this.client.send('todo.delete', { id }));
    return result;
  }
}
