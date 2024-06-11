import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';

@Module({
    imports: [JwtModule],
    providers: [TokenService],
    controllers: [TokenController],
    exports: [TokenService],
})
export class TokenModule {}
