import { UserRequestDto } from '@/modules/users';

export class LoginRequestDto {
  @UserRequestDto.email()
  email: string;

  @UserRequestDto.password()
  password: string;
}
