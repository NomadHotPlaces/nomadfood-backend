import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Column } from 'typeorm';

import { SwaggerDoc } from '@/common';
import { SNSProvider, USER } from '@/models';

export const UserDoc = {
  userId() {
    return applyDecorators(SwaggerDoc.id('사용자 식별자'));
  },

  email() {
    return applyDecorators(
      ApiProperty({
        description: USER.EMAIL.KR,
        example: 'user1@example.com',
      }),
    );
  },

  password() {
    return applyDecorators(
      ApiProperty({
        description: USER.PASSWORD.KR,
        example: 'User1234!',
      }),
    );
  },

  username() {
    return applyDecorators(
      ApiProperty({
        description: USER.USERNAME.KR,
        example: 'user123',
      }),
    );
  },

  name() {
    return applyDecorators(
      ApiProperty({
        description: USER.NAME.KR,
        example: '김회원',
      }),
    );
  },

  role() {
    return applyDecorators(
      ApiProperty({
        description: USER.ROLE.KR,
        example: 'USER',
      }),
    );
  },

  provider() {
    return applyDecorators(
      Column({
        length: USER.PROVIDER.MAX_LENGTH,
        default: SNSProvider.LOCAL,
      }),
    );
  },

  snsId() {
    return applyDecorators(
      Column({
        nullable: true,
      }),
    );
  },
};
