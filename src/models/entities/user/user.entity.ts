import { Column, Entity } from 'typeorm';

import { CommonIdEntity } from '@/common';

import { USER } from '@/models/constants';
import { SNSProvider, UserRole } from '@/models/enums';

@Entity()
export class User extends CommonIdEntity {
  @Column({
    unique: true,
    length: USER.EMAIL.MAX_LENGTH,
  })
  email: string;

  @Column({
    length: USER.PASSWORD.MAX_LENGTH,
    select: false,
  })
  password: string;

  @Column({
    length: USER.USERNAME.MAX_LENGTH,
  })
  username: string;

  @Column({
    length: USER.NAME.MAX_LENGTH,
  })
  name: string;

  @Column({
    type: 'char',
    length: USER.ROLE.MAX_LENGTH,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    length: USER.PROVIDER.MAX_LENGTH,
    default: SNSProvider.LOCAL,
  })
  provider: SNSProvider;

  @Column({
    nullable: true,
  })
  snsId: string;
}
