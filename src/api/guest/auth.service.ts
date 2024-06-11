import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {TokenService} from "./token.service";
import {SignUpDto} from "./request_dto/sign-up.dto";
import {UserEntity} from "../../core/entity/user.entity";
import * as bcrypt from 'bcrypt';

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
        const isPasswordMatch = await bcrypt.compare(pass, user.password);
        console.log(isPasswordMatch)
        if (!isPasswordMatch) {
            throw new UnauthorizedException();
        }

        // AccessToken과 RefreshToken 생성
        const accessToken = await this.tokenService.createAccessToken(user);
        const refreshToken = await this.tokenService.createRefreshToken(user);
        return { accessToken: accessToken, refreshToken: refreshToken };
    }

    async signUp(signUpDto: SignUpDto): Promise<UserEntity | null> {
        const user = await this.usersService.findOneByLoginId(signUpDto.loginId);
        if (user) {
            return null;
        }
        const hashPassword = await this.createHashPassword(signUpDto.password);

        const userEntity = {
            loginId: signUpDto.loginId,
            password: hashPassword,
            firstName: signUpDto.firstName,
            lastName: signUpDto.lastName,
        } as UserEntity
        await this.usersService.create(userEntity);
        return userEntity;
    }

    // 비밀번호 해싱
    private async createHashPassword(password: string) {
        const saltRounds = 10; // 해싱 강도
        return await bcrypt.hash(password, saltRounds);
    }
}