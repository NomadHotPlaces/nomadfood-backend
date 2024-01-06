import { HttpStatus } from '@nestjs/common';

export interface IExceptionObject {
  status: HttpStatus;
  message: string;
}

export const EXCEPTION = {
  AUTH: {
    DUPLICATE_EMAIL: {
      status: HttpStatus.BAD_REQUEST,
      message: '이미 존재하는 이메일입니다.',
    },
    JOIN_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '회원가입 중 알 수 없는 오류가 발생했습니다.',
    },
  },
};
