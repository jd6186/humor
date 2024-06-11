import {ApiProperty} from "@nestjs/swagger";

export class SignUpDto {
    @ApiProperty({ description: '로그인 아이디' })
    loginId: string;

    @ApiProperty({ description: '비밀번호' })
    password: string;

    @ApiProperty({ description: '이름' })
    firstName: string;

    @ApiProperty({ description: '성' })
    lastName: string;
}