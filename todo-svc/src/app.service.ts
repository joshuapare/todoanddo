import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  handleTodoCreated(data: Record<string, unknown>) {
    console.log('Todo created: ', data);
  }

  handleTodoFound(data: Record<string, unknown>) {
    console.log('Todo found: ', data);
  }

  handleTodoUpdated(data: Record<string, unknown>) {
    console.log('Todo updated: ', data);
  }

  handleTodoDeleted(data: Record<string, unknown>) {
    console.log('Todo deleted: ', data);
  }
}
