import { Test, TestingModule } from '@nestjs/testing';

import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/join (POST)', () => {
    const newUser = {
      email: `test${Date.now()}@example.com`,
      password: 'Test1234',
      username: 'TestUser',
      name: '김테스터',
    };

    return request(app.getHttpServer())
      .post('/auth/join')
      .send(newUser)
      .expect(201);
  });

  it('/auth/join (POST) - Duplicate Email', async () => {
    const newUser = {
      email: `test${Date.now()}@example.com`,
      password: 'Test1234',
      username: 'TestUser',
      name: '김테스터',
    };

    await request(app.getHttpServer())
      .post('/auth/join')
      .send(newUser)
      .expect(201);

    return request(app.getHttpServer())
      .post('/auth/join')
      .send(newUser)
      .expect(400);
  });
});
