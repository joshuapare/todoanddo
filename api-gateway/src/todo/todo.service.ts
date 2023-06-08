import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_SERVICE') private readonly todoClient: ClientKafka,
  ) {}

  create(data: Record<string, unknown>) {
    this.todoClient.emit('create_todo', data);
  }

  find(data: Record<string, unknown>) {
    this.todoClient.send('find_todo', data);
  }

  update(data: Record<string, unknown>) {
    this.todoClient.emit('update_todo', data);
  }

  delete(id: string) {
    this.todoClient.emit('delete_todo', id);
  }
}
