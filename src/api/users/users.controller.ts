import {Body, Controller, Get, HttpException, Param, Post, Req} from '@nestjs/common';
import {CreateUserDto} from "./request_dto/create-user.dto";
import { UsersService } from './users.service';
import {CustomHttpStatus} from "../../core/error/error.code";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(@Req() request: Request): string {
        return this.usersService.findAll();
    }

    @Get('detail/:id')
    findOne(@Param() params: any): string {
        console.log(params.id);
        return this.usersService.findOne(params.id);
    }

    @Get('asynchronous')
    async findAsynchronousAll(): Promise<any[]> {
        return this.usersService.findAllUserList();
    }

    @Get('exception')
    findException(): string {
        throw new HttpException(CustomHttpStatus.FORBIDDEN.message, CustomHttpStatus.FORBIDDEN.code);
    }

    @Post()
    async create(@Body() createCatDto: CreateUserDto) {
        return `This action adds a new user #${createCatDto.name} with age ${createCatDto.age}`;
    }
}
