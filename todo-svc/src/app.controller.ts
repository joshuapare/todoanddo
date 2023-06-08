import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('todo.create')
  async handleTodoCreated(data: Record<string, unknown>) {
    return this.appService.handleTodoCreated(data);
  }

  @MessagePattern('todo.find')
  async handleTodoFound(data: Record<string, unknown>) {
    return this.appService.handleTodoFound(data);
  }

  @MessagePattern('todo.update')
  async handleTodoUpdated(data: Record<string, unknown>) {
    return this.appService.handleTodoUpdated(data);
  }

  @MessagePattern('todo.delete')
  async handleTodoDeleted(data: Record<string, unknown>) {
    return this.appService.handleTodoDeleted(data);
  }
}
