export interface IPropsWithPropertyName {
  property: string;
}

interface IPropsWithMinLength extends IPropsWithPropertyName {
  minLength: number;
}

interface IPropsWithMaxLength extends IPropsWithPropertyName {
  maxLength: number;
}

interface IPropsWithMin extends IPropsWithPropertyName {
  min: number;
}

interface IPropsWithMax extends IPropsWithPropertyName {
  max: number;
}

interface IMessageOptions extends IPropsWithPropertyName {
  description?: string;
  example?: string;
}

type PropsWithLengthType = IPropsWithMinLength & IPropsWithMaxLength;

export function getStringTypeMessage({
  property,
  description,
  example,
}: IMessageOptions): string {
  const comma = description && example ? ', ' : '';
  const exampleWithPrefix = example ? `예시: ${example}` : '';
  const suffix =
    description || example
      ? ` (${description}${comma}${exampleWithPrefix})`
      : '';

  return `${property}의 형식이 올바르지 않습니다.${suffix}`;
}

export function getMaxLengthMessage({
  property,
  maxLength,
}: IPropsWithMaxLength): string {
  return `${property}의 길이는 ${maxLength}자 이하여야합니다.`;
}

export function getLengthMessage({
  property,
  minLength,
  maxLength,
}: PropsWithLengthType): string {
  return `${property}의 길이는 ${minLength}자 이상, ${maxLength}자 이하여야합니다.`;
}

// 타입 관련 함수
function getTypeCheckMessage(property: string, type: string): string {
  return `${property} 필드는 ${type}여야합니다.`;
}

export function getIsStringMessage({
  property,
}: IPropsWithPropertyName): string {
  return getTypeCheckMessage(property, '문자열');
}

export function getIsIntMessage({ property }: IPropsWithPropertyName): string {
  return getTypeCheckMessage(property, '정수형');
}

// String 타입 관련 함수
export function getIsUrlMessage({ property }: IPropsWithPropertyName): string {
  return getTypeCheckMessage(property, 'URL 형식');
}

// 값 크기 관련 함수
export function getMinMessage({ property, min }: IPropsWithMin): string {
  return `${property}의 최소값은 ${min}입니다.`;
}

export function getMaxMessage({ property, max }: IPropsWithMax): string {
  return `${property}의 최소값은 ${max}입니다.`;
}
