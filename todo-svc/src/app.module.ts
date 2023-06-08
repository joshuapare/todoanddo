import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './app.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todo, TodoSchema } from './entities/todo.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          store: redisStore,
          host: configService.get<string>('cache.host'),
          port: configService.get<number>('cache.port'),
          // username: configService.get<string>('cache.user'),
          // password: configService.get<string>('cache.pass'),
          db: configService.get<number>('cache.db.TODO'),
        };
      },
      inject: [ConfigService],
    }),
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
