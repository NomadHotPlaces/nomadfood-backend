import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { SwaggerMethodDocType } from '@/common';

import { EXCEPTION } from '@/docs/exception-docs';
import { AuthController } from '@/modules/auth';
import { LoginFormDoc, LoginResponseDoc } from '@/docs/dto-docs';

export const AuthControllerDoc: SwaggerMethodDocType<AuthController> = {
  join(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '회원가입 양식을 받아 신규 회원으로 등록합니다.',
      }),
      ApiCreatedResponse({ description: '회원가입에 성공했습니다.' }),
      ApiBadRequestResponse({ description: '잘못된 인증 정보 입력입니다.' }),
      ApiInternalServerErrorResponse({
        description: EXCEPTION.COMMON.INTERNAL_SERVER_ERROR.message,
      }),
    );
  },

  login(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          '입력받은 회원의 이메일과 비밀번호로 인증 과정을 거친 뒤 JWT를 발급합니다.',
      }),
      ApiBody({
        type: LoginFormDoc,
      }),
      ApiOkResponse({
        description: '로그인에 성공했습니다.',
        type: LoginResponseDoc,
      }),
      ApiInternalServerErrorResponse({
        description: EXCEPTION.COMMON.INTERNAL_SERVER_ERROR.message,
      }),
    );
  },
};
