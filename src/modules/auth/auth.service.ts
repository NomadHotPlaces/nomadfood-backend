import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { handleException, throwExceptionOrNot } from '@/common';
import { AuthConfigType } from '@/configs';
import { CONFIG } from '@/constants';
import { EXCEPTION } from '@/docs';
import { User, UserRepository, UserRole } from '@/models';

import { JoinForm } from './dtos';
import { IJwtPayload } from './interface';

import { AUTH } from './auth.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async join(joinForm: JoinForm): Promise<void> {
    const { email, password, username, name } = joinForm;

    const existsEmail: User = await this.userRepository.findOne({
      where: { email },
      withDeleted: true,
    });

    throwExceptionOrNot(!existsEmail, EXCEPTION.AUTH.DUPLICATE_EMAIL);

    const existsUsername: User = await this.userRepository.findOne({
      where: { username },
      withDeleted: true,
    });

    throwExceptionOrNot(!existsUsername, EXCEPTION.AUTH.DUPLICATE_USERNAME);

    try {
      await this.userRepository.insert(
        this.userRepository.create({
          email,
          password: await bcrypt.hash(password, AUTH.SALT),
          username,
          name,
          role: UserRole.USER,
        }),
      );
    } catch (error) {
      handleException(EXCEPTION.AUTH.JOIN_ERROR);
      throw error;
    }
  }

  async validateLocalUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findWithPassword(email);

    throwExceptionOrNot(user, EXCEPTION.AUTH.BAD_AUTH_REQUEST);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    delete user.password;

    throwExceptionOrNot(isPasswordValid, EXCEPTION.AUTH.BAD_AUTH_REQUEST);

    return user;
  }

  generateAccessToken({ id }: IJwtPayload): string {
    const payload: IJwtPayload = { id };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<AuthConfigType>(CONFIG.AUTH)
        .accessTokenSecret,
      expiresIn: this.configService.get<AuthConfigType>(CONFIG.AUTH)
        .accessTokenExpiresIn,
    });
  }

  async generateRefreshToken({ id }: IJwtPayload): Promise<string> {
    const payload: IJwtPayload = { id };

    try {
      const refreshToken = this.jwtService.sign(payload, {
        secret: this.configService.get<AuthConfigType>(CONFIG.AUTH)
          .accessTokenSecret,
        expiresIn: this.configService.get<AuthConfigType>(CONFIG.AUTH)
          .accessTokenExpiresIn,
      });

      const hashedRefreshToken = await bcrypt.hash(refreshToken, AUTH.SALT);

      const result = await this.userRepository.update(id, {
        refreshToken: hashedRefreshToken,
      });

      throwExceptionOrNot(result.affected, EXCEPTION.AUTH.REFRESH_FAILURE);

      return refreshToken;
    } catch (error) {
      handleException(EXCEPTION.AUTH.JWT_ERROR);
    }
  }
}
