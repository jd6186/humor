import { Controller, Delete, Get, HttpException, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import {CustomHttpStatus} from "../../core/error/error.code";
import {UserEntity} from "../../core/entity/user.entity";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiTags('users')
@ApiBearerAuth() // Swagger에서 JWT 토큰 필요하도록 설정
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(@Req() request: Request): Promise<UserEntity[]> {
        return this.usersService.findAll();
    }

    @Get('detail/:id')
    findOne(@Param() params: any): Promise<UserEntity | null> {
        console.log(params.id);
        return this.usersService.findOne(params.id);
    }

    @Get('exception')
    findException(): string {
        throw new HttpException(CustomHttpStatus.FORBIDDEN.message, CustomHttpStatus.FORBIDDEN.code);
    }

    @Delete(':id')
    async remove(id: number): Promise<void> {
        await this.usersService.remove(id);
    }
}
