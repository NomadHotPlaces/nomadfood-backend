import { SetMetadata } from '@nestjs/common';

export const TYPEORM_ENTITY_REPOSITORY = 'TYPEORM_ENTITY_REPOSITORY';

export function EntityRepository<T>(entity: new () => T): ClassDecorator {
  return SetMetadata(TYPEORM_ENTITY_REPOSITORY, entity);
}
