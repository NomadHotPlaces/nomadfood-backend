import { DocumentBuilder } from '@nestjs/swagger';

import { APP } from '@/constants';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('NomadFood - API')
  .setDescription('NomadFood API 문서')
  .setVersion(APP.VERSION)
  .build();
