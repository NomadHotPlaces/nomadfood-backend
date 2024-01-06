import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { SNSProvider, UserRepository, UserRole } from '@/models';

import { JoinForm } from '../dtos';

import { AuthService } from '../auth.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'hashedPassword'),
}));

const mockRepository = jest.fn(() => ({
  findOne: jest.fn(),
  insert: jest.fn(),
  create: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(UserRepository));
  });

  it('서비스가 정의되어야합니다.', () => {
    expect(service).toBeDefined();
  });

  describe('join', () => {
    it('존재하지 않는 이메일이라면 새로운 계정을 생성합니다.', async () => {
      const joinForm: JoinForm = {
        email: 'test@example.com',
        password: 'Test1234!',
        username: 'TestUser',
        name: '김테스트',
      };

      (userRepository.findOne as jest.Mock).mockResolvedValue(null);
      (userRepository.create as jest.Mock).mockReturnValue({
        email: joinForm.email,
        password: 'hashedPassword',
        username: joinForm.username,
        name: joinForm.name,
        role: UserRole.USER,
        provider: SNSProvider.LOCAL,
        snsId: null,
      });

      await service.join(joinForm);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: joinForm.email },
        withDeleted: true,
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(
        joinForm.password,
        expect.any(Number),
      );
      expect(userRepository.create).toHaveBeenCalledWith({
        email: joinForm.email,
        password: 'hashedPassword',
        username: joinForm.username,
        name: joinForm.name,
        role: UserRole.USER,
      });
      expect(userRepository.insert).toHaveBeenCalled();
    });
  });

  it('이미 존재하는 이메일일 경우, 에러를 반환합니다.', async () => {
    const joinForm: JoinForm = {
      email: 'test@example.com',
      password: 'Test1234!',
      username: 'Tester',
      name: '김테스트',
    };

    (userRepository.findOne as jest.Mock).mockResolvedValue({
      email: joinForm.email,
      password: 'hashedPassword',
      username: joinForm.username,
      name: joinForm.name,
      role: UserRole.USER,
      provider: SNSProvider.LOCAL,
      snsId: null,
    });

    await expect(service.join(joinForm)).rejects.toThrow();
  });

  it('잘못된 사용자 이름이 제공되면 에러를 반환합니다.', async () => {
    const joinForm: JoinForm = {
      email: 'test@example.com',
      password: 'Test1234!',
      username: 'Invalid TestUser',
      name: '김테스트',
    };

    await expect(service.join(joinForm)).rejects.toThrow();
  });

  it('잘못된 이름이 제공되면 에러를 반환합니다.', async () => {
    const joinForm: JoinForm = {
      email: 'test@example.com',
      password: 'Test1234!',
      username: 'TestUser',
      name: '잘못된 사용자 이름입니다abcd123',
    };

    await expect(service.join(joinForm)).rejects.toThrow();
  });

  it('이메일이 누락되면 오류가 발생합니다.', async () => {
    const joinForm: JoinForm = {
      email: '',
      password: 'Test1234!',
      username: 'TestUser',
      name: '김테스트',
    };

    await expect(service.join(joinForm)).rejects.toThrow();
  });

  it('비밀번호가 누락되면 오류가 발생합니다.', async () => {
    const joinForm: JoinForm = {
      email: 'test@example.com',
      password: '',
      username: 'TestUser',
      name: '김테스트',
    };

    await expect(service.join(joinForm)).rejects.toThrow();
  });
});
