import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { ModelNamesEnum } from '../../../enums/modelNames.enum';
import { Model } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import * as crypto from 'crypto';
import { config } from '../../../config';
import { UsersAuthJwtPayloadType } from './types/users-auth.jwt-payload.type';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersAuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(ModelNamesEnum.USER)
    private readonly userRepository: Model<User>,
  ) {}

  async getUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const passwordHash: string = this.encryptPassword(password);
    const user = this.userRepository.findOne({
      email,
      secretWordHash: passwordHash,
    });
    return user || null;
  }

  async getUserById(id: string): Promise<User | null> {
    if (!mongoose.isValidObjectId(id)) return null;
    const user = await this.userRepository.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return user || null;
  }

  async login(user: User) {
    const payload: UsersAuthJwtPayloadType = { id: user._id };
    return {
      accessToken: this.jwtSign(payload),
    };
  }

  jwtSign(data: string | object | Buffer) {
    return this.jwtService.sign(data);
  }

  encryptPassword(password: string) {
    const hash: crypto.Hmac = crypto.createHmac(
      'sha512',
      config.userPasswordEncryptionKey,
    );
    hash.update(password);
    return hash.digest('hex');
  }
}
