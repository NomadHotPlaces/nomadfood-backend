import { IsEmail, Length, Matches, MaxLength } from 'class-validator';

type PropertyDecoratorOptionsType = {
  isEmailOptions?: Parameters<typeof IsEmail>[0];
  maxLengthOptions?: Parameters<typeof MaxLength>[1];
  matchesOptions?: Parameters<typeof Matches>[1];
  lengthOptions?: Parameters<typeof Length>[2];
};

export type SwaggerMethodDocType<T> = {
  [K in keyof T]: (summary: string) => MethodDecorator;
};

export type SwaggerFieldDocType<T> = {
  [K in keyof T]?: (
    property?: string,
    options?: PropertyDecoratorOptionsType,
  ) => PropertyDecorator;
};

export type SwaggerEntityDocType<Entity> = SwaggerFieldDocType<Entity>;
