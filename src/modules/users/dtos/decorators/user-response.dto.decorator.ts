import { applyDecorators } from '@nestjs/common';

import { UserDoc } from '@/docs';

export const UserResponseDto = {
  userId(): PropertyDecorator {
    return applyDecorators(UserDoc.userId());
  },

  email(): PropertyDecorator {
    return applyDecorators(UserDoc.email());
  },

  password(): PropertyDecorator {
    return applyDecorators(UserDoc.password());
  },

  username(): PropertyDecorator {
    return applyDecorators(UserDoc.username());
  },

  name(): PropertyDecorator {
    return applyDecorators(UserDoc.name());
  },

  provider(): PropertyDecorator {
    return applyDecorators(UserDoc.provider());
  },

  snsId(): PropertyDecorator {
    return applyDecorators(UserDoc.snsId());
  },
};
