import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthControllerDoc as Doc } from '@/docs';
import { User } from '@/models';

import { CurrentUser } from './decorator';
import { JoinForm, LoginResponse } from './dtos';
import { LocalAuthGuard } from './guards';
import { IJwtPayload } from './interface';

import { AuthService } from './auth.service';

@ApiTags('인증/인가 API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Doc.join('회원가입')
  @Post('join')
  async join(@Body() joinForm: JoinForm): Promise<void> {
    await this.authService.join(joinForm);
  }

  @Doc.login('로그인')
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: User): Promise<LoginResponse> {
    return this.issueTokens(user);
  }

  private async issueTokens(user: User): Promise<LoginResponse> {
    const jwtPayload: IJwtPayload = { id: user.id };
    const accessToken = this.authService.generateAccessToken(jwtPayload);

    return {
      accessToken,
    };
  }
}
