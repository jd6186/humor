import {Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from "../../core/scurity/auth.guard";

@Controller('guest/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.loginId, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    // 테스트
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }
}

