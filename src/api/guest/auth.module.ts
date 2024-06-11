import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from "../../core/scurity/jwtConstants";
import { TokenModule } from './token.module';
import {UserEntity} from "../../core/entity/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm"; // TokenModule 가져오기

@Module({
    imports: [
        UsersModule,
        TokenModule, // TokenModule 포함
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
