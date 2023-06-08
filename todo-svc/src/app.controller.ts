import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('todo_created')
  async handleTodoCreated(data: Record<string, unknown>) {
    this.appService.handleTodoCreated(data);
  }

  @EventPattern('todo_found')
  async handleTodoFound(data: Record<string, unknown>) {
    this.appService.handleTodoFound(data);
  }

  @EventPattern('todo_updated')
  async handleTodoUpdated(data: Record<string, unknown>) {
    this.appService.handleTodoUpdated(data);
  }

  @EventPattern('todo_deleted')
  async handleTodoDeleted(data: Record<string, unknown>) {
    this.appService.handleTodoDeleted(data);
  }
}
