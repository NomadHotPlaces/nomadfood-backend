import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Column } from 'typeorm';

import { SwaggerDoc } from '@/common';
import { SNSProvider, USER } from '@/models';

export const UserDoc = {
  userId(): PropertyDecorator {
    return applyDecorators(SwaggerDoc.id('사용자 식별자'));
  },

  email(): PropertyDecorator {
    return applyDecorators(
      ApiProperty({
        description: USER.EMAIL.KR,
        example: 'user1@example.com',
      }),
    );
  },

  password(): PropertyDecorator {
    return applyDecorators(
      ApiProperty({
        description: USER.PASSWORD.KR,
        example: 'User1234!',
      }),
    );
  },

  username(): PropertyDecorator {
    return applyDecorators(
      ApiProperty({
        description: USER.USERNAME.KR,
        example: 'UsEr123',
      }),
    );
  },

  name(): PropertyDecorator {
    return applyDecorators(
      ApiProperty({
        description: USER.NAME.KR,
        example: '김회원',
      }),
    );
  },

  role(): PropertyDecorator {
    return applyDecorators(
      ApiProperty({
        description: USER.ROLE.KR,
        example: 'USER',
      }),
    );
  },

  provider(): PropertyDecorator {
    return applyDecorators(
      Column({
        length: USER.PROVIDER.MAX_LENGTH,
        default: SNSProvider.LOCAL,
      }),
    );
  },

  snsId(): PropertyDecorator {
    return applyDecorators(
      Column({
        nullable: true,
      }),
    );
  },
};
