import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_SERVICE') private readonly todoClient: ClientKafka,
  ) {}

  create(data: Record<string, unknown>) {
    this.todoClient.emit('todo.create', data);
  }

  find(data: Record<string, unknown>) {
    this.todoClient.emit('todo.find', data);
  }

  update(data: Record<string, unknown>) {
    this.todoClient.emit('todo.update', data);
  }

  delete(id: string) {
    this.todoClient.emit('todo.delete', id);
  }
}
