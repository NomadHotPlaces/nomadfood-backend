import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDoc {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'JWT Access 토큰',
  })
  accessToken: string;
}
