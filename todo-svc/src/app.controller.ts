import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('todo.create')
  handleTodoCreated(data: Record<string, unknown>) {
    this.appService.handleTodoCreated(data);
  }

  @EventPattern('todo.find')
  handleTodoFound(data: Record<string, unknown>) {
    this.appService.handleTodoFound(data);
  }

  @EventPattern('todo.update')
  handleTodoUpdated(data: Record<string, unknown>) {
    this.appService.handleTodoUpdated(data);
  }

  @EventPattern('todo.delete')
  handleTodoDeleted(data: Record<string, unknown>) {
    this.appService.handleTodoDeleted(data);
  }
}
