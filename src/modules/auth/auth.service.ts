import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { handleException, throwExceptionOrNot } from '@/common';
import { AuthConfigType } from '@/configs';
import { CONFIG } from '@/constants';
import { EXCEPTION } from '@/docs';
import { USER, User, UserRepository, UserRole } from '@/models';

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

    if (!email) {
      throwExceptionOrNot(false, EXCEPTION.AUTH.MISSING_EMAIL);
    }

    if (!password) {
      throwExceptionOrNot(false, EXCEPTION.AUTH.MISSING_PASSWORD);
    }

    if (!USER.USERNAME.REG_EXP.test(username)) {
      throwExceptionOrNot(false, EXCEPTION.AUTH.INVALID_USERNAME);
    }

    if (!USER.NAME.REG_EXP.test(name)) {
      throwExceptionOrNot(false, EXCEPTION.AUTH.INVALID_NAME);
    }

    const existsUser: User = await this.userRepository.findOne({
      where: { email },
      withDeleted: true,
    });

    throwExceptionOrNot(!existsUser, EXCEPTION.AUTH.DUPLICATE_EMAIL);

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
}
