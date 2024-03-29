import { UserRequestDto } from '@/modules/users';

export class JoinForm {
  @UserRequestDto.email()
  email: string;

  @UserRequestDto.password()
  password: string;

  @UserRequestDto.username()
  username: string;

  @UserRequestDto.name()
  name: string;

  @UserRequestDto.phone()
  phone: string;
}
