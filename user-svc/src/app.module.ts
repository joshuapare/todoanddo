import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './app.config';

import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/entities/user.entity';

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
      inject: [ConfigService],
      useFactory: async (cfg: ConfigService) => {
        return {
          store: redisStore,
          host: cfg.get<string>('cache.host'),
          port: cfg.get<number>('cache.port'),
          // username: cfg.get<string>('cache.user'),
          // password: cfg.get<string>('cache.pass'),
          db: cfg.get<number>('cache.db'),
        };
      },
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (cfg: ConfigService) => {
        return {
          dialect: 'mysql',
          host: cfg.get<string>('db.host'),
          port: cfg.get<number>('db.port'),
          username: cfg.get<string>('db.user'),
          password: cfg.get<string>('db.pass'),
          database: cfg.get<string>('db.db'),
          models: [User],
          autoLoadModels: true,
          synchronize: true,
        };
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
