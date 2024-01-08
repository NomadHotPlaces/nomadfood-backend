import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { User } from '@/models';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    console.log('요청 사용자: ', request.user);
    return request.user;
  },
);
