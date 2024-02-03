import { HttpStatus } from '@nestjs/common';

export interface IExceptionObject {
  status: HttpStatus;
  message: string;
}

export const EXCEPTION = {
  COMMON: {
    INTERNAL_SERVER_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '알 수 없는 서버 오류가 발생했습니다.',
    },
  },

  AUTH: {
    BAD_AUTH_REQUEST: {
      status: HttpStatus.BAD_REQUEST,
      message: '잘못된 인증 요청입니다.',
    },
    DUPLICATE_EMAIL: {
      status: HttpStatus.BAD_REQUEST,
      message: '이미 사용중인 이메일입니다.',
    },
    DUPLICATE_USERNAME: {
      status: HttpStatus.BAD_REQUEST,
      message: '이미 사용중인 닉네임입니다.',
    },
    JOIN_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '회원가입 중 알 수 없는 오류가 발생했습니다.',
    },
    JWT_ERROR: {
      status: HttpStatus.BAD_REQUEST,
      message: '토큰 발급 중 오류가 발생했습니다.',
    },
    MISSING_EMAIL: {
      status: HttpStatus.BAD_REQUEST,
      message: '이메일을 입력해주세요.',
    },
    MISSING_PASSWORD: {
      status: HttpStatus.BAD_REQUEST,
      message: '비밀번호를 입력해주세요.',
    },
    INVALID_USERNAME: {
      status: HttpStatus.BAD_REQUEST,
      message: '잘못된 형식의 닉네임입니다.',
    },
    INVALID_NAME: {
      status: HttpStatus.BAD_REQUEST,
      message: '잘못된 형식의 이름입니다.',
    },
    REFRESH_FAILURE: {
      status: HttpStatus.BAD_REQUEST,
      message: 'Refresh 토큰 갱신에 실패했습니다.',
    },
  },
};
