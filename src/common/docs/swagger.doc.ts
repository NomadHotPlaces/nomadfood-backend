import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const SwaggerDoc = {
  id(description: string) {
    return applyDecorators(
      ApiProperty({
        description,
        example: 1,
      }),
    );
  },

  createdAt() {
    return applyDecorators(
      ApiPropertyOptional({
        example: '2024-01-05 11:23:43',
        description: '생성일',
      }),
    );
  },

  updatedAt() {
    return applyDecorators(
      ApiPropertyOptional({
        example: '2024-01-05 22:59:33',
        description: '수정일',
      }),
    );
  },

  deletedAt() {
    return applyDecorators(
      ApiPropertyOptional({
        example: '2024-01-06 14:59:33',
        description: '삭제일',
      }),
    );
  },
};
