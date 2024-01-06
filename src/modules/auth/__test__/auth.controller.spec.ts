import { Test, TestingModule } from '@nestjs/testing';

import { JoinForm } from '../dtos';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

jest.mock('../auth.service', () => ({
  AuthService: jest.fn().mockImplementation(() => ({
    join: jest.fn(),
  })),
}));

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('컨트롤러가 정의되어야합니다.', () => {
    expect(controller).toBeDefined();
  });

  describe('join', () => {
    it('AuthService의 join 메서드를 호출합니다.', async () => {
      const joinForm: JoinForm = {
        email: 'user1@example.com',
        password: 'User1234!',
        username: 'UserName',
        name: '김테스트',
      };

      (authService.join as jest.Mock).mockResolvedValue(undefined);

      await controller.join(joinForm);

      expect(authService.join).toHaveBeenCalledWith(joinForm);
    });
  });
});
