import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { handleException, throwExceptionOrNot } from '@/common';
import { EXCEPTION } from '@/docs';
import { User, UserRepository, UserRole } from '@/models';

import { JoinForm } from './dtos';

import { AUTH } from './auth.constant';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async join(joinForm: JoinForm): Promise<void> {
    const { email, password, username, name } = joinForm;

    const existsUser: User = await this.userRepository.findOne({
      where: { email },
      withDeleted: true,
    });

    throwExceptionOrNot(!existsUser, EXCEPTION.AUTH.DUPLICATE_EMAIL);

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
      console.log(error);
      handleException(EXCEPTION.AUTH.JOIN_ERROR);
    }
  }
}
