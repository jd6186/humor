import { Injectable } from '@nestjs/common';
import {User} from "./interfaces/users.interface";

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    findAll(): string {
        return 'This action returns all users';
    }

    findOne(id: number): string {
        return `This action returns a #${id} user`;
    }

    findOneByLoginId(loginId: string): User{
        return this.users.pop()
    }

    findAllUserList(): User[] {
        return this.users;
    }

    create(user: User) {
        this.users.push(user);
    }
}