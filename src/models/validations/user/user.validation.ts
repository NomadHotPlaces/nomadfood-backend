import { applyDecorators } from '@nestjs/common';

import {
  IsEmail,
  IsMobilePhone,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import {
  SwaggerEntityDocType,
  getIsStringMessage,
  getLengthMessage,
  getStringTypeMessage,
} from '@/common';

import { USER } from '@/models/constants';
import { User } from '@/models/entities';

export const UserValidation: SwaggerEntityDocType<User> = {
  email(propertyName?: string) {
    const property = propertyName || USER.EMAIL.KR;

    return applyDecorators(
      IsEmail({}, { message: getStringTypeMessage({ property }) }),
      Length(USER.EMAIL.MIN_LENGTH, USER.EMAIL.MAX_LENGTH, {
        message: getLengthMessage({
          property,
          minLength: USER.EMAIL.MIN_LENGTH,
          maxLength: USER.EMAIL.MAX_LENGTH,
        }),
      }),
      Matches(USER.EMAIL.REG_EXP, {
        message: `${property}에는 영문 대소문자, 숫자, 특수문자(@, ., _, -)만 사용할 수 있습니다.`,
      }),
    );
  },

  password(propertyName?: string) {
    const property = propertyName || USER.PASSWORD.KR;

    return applyDecorators(
      Matches(USER.PASSWORD.REG_EXP, {
        message: `${property}의 길이는 ${USER.PASSWORD.MIN_LENGTH}자 이상, ${USER.PASSWORD.MAX_LENGTH}자 이하이며, 영문과 숫자 및 특수기호를 포함해야합니다.`,
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
        message: `${property}에는 한글 외 다른 문자를 사용할 수 없습니다.`,
      }),
    );
  },

  phone(propertyName?: string) {
    const property = propertyName || USER.PHONE.KR;

    return applyDecorators(
      IsMobilePhone(
        'ko-KR',
        {},
        {
          message: getStringTypeMessage({ property }),
        },
      ),
      Matches(USER.PHONE.REG_EXP, {
        message: `${property}는 01x-xxxx-xxxx 또는 01xxxxxxxxx 형식의 대한민국 연락처 표준에 맞게 입력해야 합니다.`,
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
