export type SwaggerFieldDocType<T> = {
  [K in keyof T]?: (prop?: any) => PropertyDecorator;
};

export type SwaggerEntityDocType<Entity> = SwaggerFieldDocType<Entity>;
