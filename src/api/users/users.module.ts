import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    exports: [UsersService], // UsersService를 외부에서 사용할 수 있도록 export
    providers: [UsersService],
})
export class UsersModule {}
