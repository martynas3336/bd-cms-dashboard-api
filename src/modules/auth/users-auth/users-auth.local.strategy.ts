import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersAuthService } from './users-auth.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class UsersAuthLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersAuthService: UsersAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.usersAuthService.getUserByEmailAndPassword(
      email,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
