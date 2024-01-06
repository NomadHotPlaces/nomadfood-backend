import { Body, Controller, Post } from '@nestjs/common';

import { JoinForm } from './dtos';

import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthControllerDoc } from '@/docs';

@ApiTags('인증/인가 API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthControllerDoc.join('회원가입')
  @Post('join')
  async join(@Body() joinForm: JoinForm): Promise<void> {
    await this.authService.join(joinForm);
  }
}
