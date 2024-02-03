import { ApiProperty } from '@nestjs/swagger';

import { USER } from '@/models';

export class LoginFormDoc {
  @ApiProperty({ description: USER.EMAIL.KR, example: 'user1@example.com' })
  email: string;

  @ApiProperty({ description: USER.PASSWORD.KR, example: 'User1234!' })
  password: string;
}
