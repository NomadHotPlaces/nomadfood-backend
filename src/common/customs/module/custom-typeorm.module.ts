import { DynamicModule, Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';

import {
  DataSource,
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  QueryRunner,
  Repository,
} from 'typeorm';

import { TYPEORM_ENTITY_REPOSITORY } from '../decorator';

export class CustomTypeOrmModule {
  public static forCustomRepository<
    Entity extends ObjectLiteral,
    T extends new (
      target: EntityTarget<Entity>,
      manager: EntityManager,
      queryRunner?: QueryRunner,
    ) => Repository<Entity>,
  >(repositories: T[]): DynamicModule {
    const providers: Provider[] = [];

    for (const repository of repositories) {
      const entity = Reflect.getMetadata(TYPEORM_ENTITY_REPOSITORY, repository);

      if (!entity) {
        continue;
      }

      providers.push({
        inject: [getDataSourceToken()],
        provide: repository,
        useFactory: (dataSource: DataSource): T => {
          const baseRepository = dataSource.getRepository<Entity>(entity);
          return new repository(
            baseRepository.target,
            baseRepository.manager,
            baseRepository.queryRunner,
          ) as unknown as T;
        },
      });
    }

    return {
      exports: providers,
      module: CustomTypeOrmModule,
      providers,
    };
  }
}
