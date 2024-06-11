import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import {jwtConstants} from "../../core/scurity/jwtConstants";

@Module({
    imports: [JwtModule.register({ // JwtModule 설정
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
    })],
    providers: [TokenService],
    exports: [TokenService],
})
export class TokenModule {}
