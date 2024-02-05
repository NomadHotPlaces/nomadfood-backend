import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { CONFIG } from '@/constants';
import { SNSProvider, UserRepository, UserRole } from '@/models';

import { JoinForm } from '../dtos';

import { AuthService } from '../auth.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'hashedValue'),
  compare: jest.fn((inputToken, hashedToken) => {
    return Promise.resolve(
      inputToken === 'testRefreshToken' && hashedToken === 'hashedValue',
    );
  }),
}));

const mockUserRepository = jest.fn(() => ({
  findOne: jest.fn(),
  insert: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
}));

const mockConfigService = {
  get: jest.fn().mockImplementation((key: string) => {
    if (key === CONFIG.AUTH) {
      return {
        accessTokenSecret: 'testAccessTokenSecret',
        accessTokenExpiresIn: '1d',
      };
    }

    return null;
  }),
};

const mockJwtService = {
  sign: jest.fn().mockImplementation(() => 'testAccessToken'),
};

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockUserRepository(),
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(UserRepository));
  });

  it('서비스가 정의되어야합니다.', () => {
    expect(authService).toBeDefined();
  });

  describe('join', () => {
    it('존재하지 않는 이메일과 닉네임이라면 새로운 계정을 생성해야합니다.', async () => {
      const joinForm: JoinForm = {
        email: 'test@example.com',
        password: 'Test1234!',
        username: 'TestUser',
        name: '김테스트',
        phone: '010-1234-5678',
      };

      (userRepository.findOne as jest.Mock).mockResolvedValue(null);
      (userRepository.create as jest.Mock).mockReturnValue({
        email: joinForm.email,
        password: 'hashedValue',
        username: joinForm.username,
        name: joinForm.name,
        role: UserRole.USER,
        provider: SNSProvider.LOCAL,
        snsId: null,
      });

      await authService.join(joinForm);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: joinForm.email },
        withDeleted: true,
      });
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { username: joinForm.username },
        withDeleted: true,
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(
        joinForm.password,
        expect.any(Number),
      );
      expect(userRepository.create).toHaveBeenCalledWith({
        email: joinForm.email,
        password: 'hashedValue',
        username: joinForm.username,
        name: joinForm.name,
        role: UserRole.USER,
      });
      expect(userRepository.insert).toHaveBeenCalled();
    });

    it('이미 존재하는 이메일일 경우, 에러를 반환합니다.', async () => {
      const joinForm: JoinForm = {
        email: 'test@example.com',
        password: 'Test1234!',
        username: 'Tester',
        name: '김테스트',
        phone: '010-1234-5678',
      };

      (userRepository.findOne as jest.Mock).mockResolvedValue({
        email: joinForm.email,
        password: 'hashedValue',
        username: joinForm.username,
        name: joinForm.name,
        role: UserRole.USER,
        provider: SNSProvider.LOCAL,
        snsId: null,
      });

      await expect(authService.join(joinForm)).rejects.toThrow();
    });
  });
});
