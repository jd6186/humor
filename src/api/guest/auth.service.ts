import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {User} from "../users/interfaces/users.interface";
import {jwtConstants} from "../../core/scurity/jwtConstants";
import {TokenService} from "./token.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService,
    ) {}

    async signIn(
        loginId: string,
        pass: string,
    ): Promise<{ accessToken: string, refreshToken: string }> {
        const user = await this.usersService.findOneByLoginId(loginId);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        // AccessToken과 RefreshToken 생성
        const accessToken = await this.tokenService.createAccessToken(user);
        const refreshToken = await this.tokenService.createRefreshToken(user);
        return { accessToken: accessToken, refreshToken: refreshToken };
    }
}