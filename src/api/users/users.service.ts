import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../core/entity/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    findOne(userId: number): Promise<UserEntity | null> {
        return this.usersRepository.findOneBy({ userId });
    }

    findOneByLoginId(loginId: string): Promise<UserEntity | null> {
        return this.usersRepository.findOne({ where: { loginId } });
    }

    // join을 해야할 경우
    // findOneByLoginId(loginId: string): Promise<UserEntity | null> {
    //     return this.usersRepository.createQueryBuilder('user')
    //         .leftJoinAndSelect('user.userDetail', 'userDetail')
    //         .where('user.loginId = :loginId', { loginId })
    //         .getOne();
    // }

    async create(user: UserEntity): Promise<void> {
        await this.usersRepository.save(user); // DB에 Write하는 부분은 await를 붙여준다.
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id); // DB에 Write하는 부분은 await를 붙여준다.
    }
}