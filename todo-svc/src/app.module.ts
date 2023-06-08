import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './entities/todo.entity';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017', {
      dbName: 'todo',
      auth: {
        username: 'root',
        password: 'password',
      },
    }),
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
