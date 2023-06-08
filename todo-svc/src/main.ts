import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    inheritAppConfig: true,
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'todo-consumer',
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.listen();
}
bootstrap();
