import { applyDecorators } from '@nestjs/common';

import { SwaggerValidation } from '@/common';
import { UserDoc } from '@/docs';
import { UserValidation } from '@/models';

export const UserRequestDto = {
  userId(): PropertyDecorator {
    return applyDecorators(UserDoc.userId(), SwaggerValidation.id());
  },

  email(): PropertyDecorator {
    return applyDecorators(UserDoc.email(), UserValidation.email());
  },

  password(): PropertyDecorator {
    return applyDecorators(UserDoc.password(), UserValidation.password());
  },

  username(): PropertyDecorator {
    return applyDecorators(UserDoc.username(), UserValidation.username());
  },

  name(): PropertyDecorator {
    return applyDecorators(UserDoc.name(), UserValidation.name());
  },

  provider(): PropertyDecorator {
    return applyDecorators(UserDoc.provider(), UserValidation.provider());
  },

  snsId(): PropertyDecorator {
    return applyDecorators(UserDoc.snsId(), UserValidation.snsId());
  },
};
