export const SWAGGER = {
  ID: {
    KR: '식별자',
    get IS_NUMBER_MESSAGE(): string {
      return `${this.KR}의 타입은 숫자이어야 합니다.`;
    },
  },
};
