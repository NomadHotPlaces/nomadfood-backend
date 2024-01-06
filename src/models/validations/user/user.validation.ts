import { applyDecorators } from '@nestjs/common';

import { IsEmail, IsString, Length, Matches, MaxLength } from 'class-validator';

import {
  SwaggerEntityDocType,
  getIsStringMessage,
  getLengthMessage,
  getMaxLengthMessage,
  getStringTypeMessage,
} from '@/common';

import { USER } from '@/models/constants';
import { User } from '@/models/entities';

export const UserValidation: SwaggerEntityDocType<User> = {
  email(propertyName?: string) {
    const property = propertyName || USER.EMAIL.KR;

    return applyDecorators(
      IsEmail({}, { message: getStringTypeMessage({ property }) }),
      MaxLength(USER.EMAIL.MAX_LENGTH, {
        message: getMaxLengthMessage({
          property,
          maxLength: USER.EMAIL.MAX_LENGTH,
        }),
      }),
    );
  },

  password(propertyName?: string) {
    const property = propertyName || USER.PASSWORD.KR;

    return applyDecorators(
      Matches(USER.PASSWORD.REG_EXP, {
        message: `${property}의 길이는 ${USER.PASSWORD.MIN_LENGTH}자 이상, ${USER.PASSWORD.MAX_LENGTH}자 이하이며, 숫자를 포함해야합니다.`,
      }),
    );
  },

  username(propertyName?: string) {
    const property = propertyName || USER.USERNAME.KR;

    return applyDecorators(
      Length(USER.USERNAME.MIN_LENGTH, USER.USERNAME.MAX_LENGTH, {
        message: getLengthMessage({
          property,
          minLength: USER.USERNAME.MIN_LENGTH,
          maxLength: USER.USERNAME.MAX_LENGTH,
        }),
      }),
      Matches(USER.USERNAME.REG_EXP, {
        message: `${property}에는 영문 대소문자 외 다른 문자를 사용할 수 없습니다.`,
      }),
    );
  },

  name(propertyName?: string) {
    const property = propertyName || USER.NAME.KR;

    return applyDecorators(
      Length(USER.NAME.MIN_LENGTH, USER.NAME.MAX_LENGTH, {
        message: getLengthMessage({
          property,
          minLength: USER.NAME.MIN_LENGTH,
          maxLength: USER.NAME.MAX_LENGTH,
        }),
      }),
      Matches(USER.NAME.REG_EXP, {
        message: `${property}에는 영문 대소문자 외 다른 문자를 사용할 수 없습니다.`,
      }),
    );
  },

  provider(propertyName?: string) {
    const property = propertyName || USER.PROVIDER.KR;

    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
    );
  },

  snsId(propertyName?: string) {
    const property = propertyName || USER.SNS_ID.KR;

    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
    );
  },
};
