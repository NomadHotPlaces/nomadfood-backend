import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const AuthResponseDto = {
  accessToken(): PropertyDecorator {
    return applyDecorators(
      ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        description: 'JWT Access Token',
      }),
    );
  },
};
