import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TODO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'todo',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'todo-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [TodoController],
})
export class TodoModule {}
