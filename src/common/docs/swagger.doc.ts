import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const SwaggerDoc = {
  id(description: string): PropertyDecorator {
    return applyDecorators(
      ApiProperty({
        description,
        example: 1,
      }),
    );
  },

  createdAt(): PropertyDecorator {
    return applyDecorators(
      ApiPropertyOptional({
        example: '2024-01-05 11:23:43',
        description: '생성일',
      }),
    );
  },

  updatedAt(): PropertyDecorator {
    return applyDecorators(
      ApiPropertyOptional({
        example: '2024-01-05 22:59:33',
        description: '수정일',
      }),
    );
  },

  deletedAt(): PropertyDecorator {
    return applyDecorators(
      ApiPropertyOptional({
        example: '2024-01-06 14:59:33',
        description: '삭제일',
      }),
    );
  },
};
