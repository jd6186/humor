import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from "./api/users/users.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {LoggerMiddleware} from "./core/middleware/logger.middleware";
import {APP_FILTER, APP_GUARD} from '@nestjs/core';
import {AllExceptionsFilter} from "./core/filter/exception.filter";
import {AuthGuard} from "./core/scurity/auth.guard";
import {AuthModule} from "./api/guest/auth.module";
import {TokenModule} from "./api/guest/token.module";
import {UserEntity} from "./core/entity/user.entity";

@Module({
  imports: [UsersModule, AuthModule, TokenModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'developer',
      password: '1234',
      database: 'humor',
      entities: [UserEntity],
      synchronize: false,
    })
  ],
  controllers: [AppController],
  providers: [AppService,
    {provide: APP_FILTER, useClass: AllExceptionsFilter},
    {provide: APP_GUARD, useClass: AuthGuard,}
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        .exclude({ path: 'guest', method: RequestMethod.ALL }) // guest 라우트에 대해서는 미들웨어를 적용하지 않겠다는 의미
        .forRoutes({ path: '*', method: RequestMethod.ALL }) // 들어온 모든 요청에 대해 미들웨어를 적용하겠다는 의미
        // .forRoutes('users'); // users 라우트에만 미들웨어를 적용하겠다는 의미
        // .forRoutes(UsersController); // UsersController 라우트에만 미들웨어를 적용하겠다는 의미
  }
}