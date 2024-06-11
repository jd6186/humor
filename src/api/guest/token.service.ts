import {Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {jwtConstants} from "../../core/scurity/jwtConstants";
import {UserEntity} from "../../core/entity/user.entity";

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}

    async createAccessToken(user: UserEntity): Promise<string> {
        const payload = { sub: user.userId, username: user.loginId };
        return this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret,
            expiresIn: '300s', // Access Token 유효 기간
        });
    }

    async createRefreshToken(user: UserEntity): Promise<string> {
        const payload = { sub: user.userId, username: user.loginId };
        return this.jwtService.signAsync(payload, {
            secret: jwtConstants.refreshSecret,
            expiresIn: '7d', // Refresh Token 유효 기간
        });
    }

    async refreshAccessToken(refreshToken: string): Promise<{accessToken: string, refreshToken: string}> {
        try {
            const accessToken = await this.jwtService.verifyAsync(refreshToken, {
                secret: jwtConstants.secret,
            });
            const user = { userId: accessToken.sub, loginId: accessToken.username } as UserEntity
            const newRefreshToken = await this.createRefreshToken(user);
            return {accessToken: accessToken, refreshToken: newRefreshToken};
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
