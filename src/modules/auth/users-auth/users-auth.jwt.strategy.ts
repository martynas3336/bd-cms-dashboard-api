import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { config } from '../../../config';
import { User } from '../../users/entities/user.entity';
import { UsersAuthJwtPayloadType } from './types/users-auth.jwt-payload.type';
import { UsersAuthService } from './users-auth.service';

@Injectable()
export class UsersAuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userAuthService: UsersAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.userJwtKey,
    });
  }

  async validate(jwtPayload: UsersAuthJwtPayloadType): Promise<User> {
    const user = this.userAuthService.getUserById(jwtPayload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
