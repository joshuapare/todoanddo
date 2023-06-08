import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  handleTodoCreated(data: Record<string, unknown>) {
    console.log('Todo created: ', data);
    return { success: true, ...data };
  }

  handleTodoFound(data: Record<string, unknown>) {
    console.log('Todo found: ', data);
    return { success: true, ...data };
  }

  handleTodoUpdated(data: Record<string, unknown>) {
    console.log('Todo updated: ', data);
    return { success: true, ...data };
  }

  handleTodoDeleted(data: Record<string, unknown>) {
    console.log('Todo deleted: ', data);
    return { success: true, ...data };
  }
}
