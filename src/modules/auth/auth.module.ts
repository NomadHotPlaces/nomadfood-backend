import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { CustomTypeOrmModule } from '@/common';
import { AuthConfigType } from '@/configs';
import { CONFIG } from '@/constants';
import { UserRepository } from '@/models';

import { strategies } from './strategies';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    CustomTypeOrmModule.forCustomRepository([UserRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<AuthConfigType>(CONFIG.AUTH)
          .accessTokenSecret,
        signOptions: {
          expiresIn: configService.get<AuthConfigType>(CONFIG.AUTH)
            .accessTokenExpiresIn,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...strategies],
})
export class AuthModule {}
