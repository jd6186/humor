import {Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/interfaces/users.interface';
import {jwtConstants} from "../../core/scurity/jwtConstants";

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}

    async createAccessToken(user: User): Promise<string> {
        const payload = { sub: user.userId, username: user.name };
        return this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret,
            expiresIn: '60s', // Access Token 유효 기간
        });
    }

    async createRefreshToken(user: User): Promise<string> {
        const payload = { sub: user.userId, username: user.name };
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
            const user = { userId: accessToken.sub, name: accessToken.username } as User
            const newRefreshToken = await this.createRefreshToken(user);
            return {accessToken: accessToken, refreshToken: newRefreshToken};
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
