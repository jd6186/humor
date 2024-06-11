import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from "./jwtConstants";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const { url } = request;

        // 특정 경로를 예외로 처리 > 이렇게만 해도 하위 경로는 모두 풀림
        const bypassUrls = ['/guest', '/api', '/another-public-route'];
        if (bypassUrls.some(path => url.startsWith(path))) {
            return true; // 인증 건너뛰기
        }

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            request['user'] = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        console.log(request.headers)
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        console.log(`token: ${token}`)
        return type === 'Bearer' ? token : undefined;
    }
}
