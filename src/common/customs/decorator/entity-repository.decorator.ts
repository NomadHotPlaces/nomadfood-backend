import { SetMetadata } from '@nestjs/common';
import { EntitySchema } from 'typeorm';

export const TYPEORM_ENTITY_REPOSITORY = 'TYPEORM_ENTITY_REPOSITORY';

export function EntityRepository(
  entity?: Function | EntitySchema<any>,
): ClassDecorator {
  return SetMetadata(TYPEORM_ENTITY_REPOSITORY, entity);
}
