import {Body, Controller, Post, HttpCode, HttpStatus, Get, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserEntity} from "../../core/entity/user.entity";
import {SignInDto} from "./request_dto/sign-in.dto";
import {SignUpDto} from "./request_dto/sign-up.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('guest')
@Controller('guest/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.loginId, signInDto.password);
    }

    // 회원가입
    @Post('signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<UserEntity | null> {
        return this.authService.signUp(signUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }
}

