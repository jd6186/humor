import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token.service';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('guest')
@Controller('guest/token')
export class TokenController {
    constructor(private tokenService: TokenService) {}

    @Post('refresh')
    async refreshAccessToken(@Body('refreshToken') refreshToken: string): Promise<{ accessToken: string, refreshToken: string }> {
        try {
            return await this.tokenService.refreshAccessToken(refreshToken);
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
