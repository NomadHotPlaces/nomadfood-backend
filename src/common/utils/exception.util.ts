import { HttpException } from '@nestjs/common';

import { IExceptionObject } from '@/docs';

export function handleException(
  { status, message }: IExceptionObject,
  error?: string,
): void {
  throw error || new HttpException(message, status);
}

/**
 * 첫번쨰 인자로 받은 조건인 `successCondition`이 `false`일 경우 예외를 발생시킵니다.
 * (논리형이면 false, 문자열이면 empty, 숫자면 0, 객체면 null)
 * @param successCondition: boolean | string | number | object
 * @param exceptionObject: status: HttpStatus, message: string
 *
 */
export function throwExceptionOrNot(
  successCondition: boolean | string | number | object,
  exceptionObject: IExceptionObject,
): void {
  if (!successCondition) {
    handleException(exceptionObject);
  }
}
