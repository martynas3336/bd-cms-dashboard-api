import { Module } from '@nestjs/common';
import { UsersAuthService } from './users-auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersAuthLocalStrategy } from './users-auth.local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UsersAuthJwtStrategy } from './users-auth.jwt.strategy';
import { config } from '../../../config';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNamesEnum } from '../../../enums/modelNames.enum';
import { UserSchema } from '../../users/entities/user.entity';
import { ConnectionNamesEnum } from '../../../enums/connectionNames.enum';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.userJwtKey,
      signOptions: { expiresIn: '86400s' },
    }),
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.USER, schema: UserSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  providers: [UsersAuthService, UsersAuthLocalStrategy, UsersAuthJwtStrategy],
  exports: [UsersAuthService, UsersAuthLocalStrategy, UsersAuthJwtStrategy],
})
export class UsersAuthModule {}
