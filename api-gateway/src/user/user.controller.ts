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
import { ClientKafka } from '@nestjs/microservices';
import { ApiBody } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';

@Controller('user')
export class UserController implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    const requestPatterns = [
      'user.create',
      'user.find',
      'user.find.one',
      'user.update',
      'user.delete',
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
    return lastValueFrom(this.client.send('user.create', data));
  }

  @Get()
  async find(@Query() data: Record<string, unknown>) {
    return lastValueFrom(this.client.send('user.find', data));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return lastValueFrom(this.client.send('user.find.one', { id }));
  }

  @ApiBody({ type: 'object' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Record<string, unknown>) {
    return lastValueFrom(this.client.send('user.update', { id, ...data }));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return lastValueFrom(this.client.send('user.delete', { id }));
  }
}
