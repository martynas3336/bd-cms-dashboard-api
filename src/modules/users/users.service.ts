import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { UserStatusEnum } from '../../enums/userStatus.enum';
import { UserModuleError } from 'src/exceptions/inner-errors/user.module.error';
import { PasswordDto } from './dto/set-password.dto';
import { EmailTemplatesService } from 'src/modules/email-templates/email-templates.service';
import { ModelNamesEnum } from '../../enums/modelNames.enum';
import { UsersAuthService } from '../auth/users-auth/users-auth.service';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(ModelNamesEnum.USER)
    private readonly userRepository: Model<User>,
    @InjectModel(ModelNamesEnum.COMPANY)
    private readonly companyRepository: Model<Company>,
    private readonly sendgridService: SendgridService,
    private readonly templatesService: EmailTemplatesService,
    private readonly usersAuthService: UsersAuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    if (!createUserDto.email) throw new UserModuleError();

    const dbUser = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (dbUser) throw new Error('User already exists');

    const user = {
      ...createUserDto,
      createdAt: new Date(),
      temporaryToken: `${uuidv4()}-${uuidv4()}-${uuidv4()}`,
    };

    await new this.userRepository(user).save();

    let redirectUrlInEmail = `<a href='https://dashboard.shopaffix.com/password/${user.temporaryToken}'>Validate</a>`;
    if (createUserDto.redirectUrl) {
      redirectUrlInEmail = `<a href='${createUserDto.redirectUrl}?resetToken=${user.temporaryToken}'>Validate</a>`;
    }

    await this.sendgridService.sendEmail({
      to: user.email,
      subject: 'Complete your registration',
      emailBody: this.templatesService.emailUserRegister(
        'Complete your registration',
        redirectUrlInEmail,
      ),
    });

    return {};
  }

  async setPassword(body: PasswordDto) {
    const user: User = await this.userRepository.findOne({
      temporaryToken: body.token,
    });
    if (!user) throw new UserModuleError();

    try {
      await this.userRepository.updateOne(
        {
          temporaryToken: body.token,
        },
        {
          secretWordHash: this.usersAuthService.encryptPassword(body.password),
          temporaryToken: `${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}`,
          status: UserStatusEnum.active,
        },
      );
    } catch (error) {
      throw new UserModuleError();
    }

    return {};
  }

  async requestUserChangePassword(email: string) {
    const temporaryToken = `${uuidv4()}-RQ-${uuidv4()}-${uuidv4()}-${uuidv4()}`;
    try {
      await this.userRepository.updateOne(
        {
          email,
        },
        {
          temporaryToken,
        },
      );

      await this.sendgridService.sendEmail({
        to: email,
        subject: 'Change password',
        emailBody: this.templatesService.emailUserRegister(
          'Change password',
          `<a href='https://dashboard.shopaffix.com/password/${temporaryToken}'>Change password</a>`,
        ),
      });
    } catch (error) {
      return {
        message: 'error',
        stack: {
          name: error.name,
          message: error.message,
        },
      };
    }

    return {};
  }

  async updateProfile(userId: string, body: Partial<User>) {
    await this.userRepository.updateOne({ _id: userId }, { ...body });
    return {};
  }

  async getProfile(userId: string): Promise<User> {
    return this.userRepository.findOne({ _id: userId });
  }

  async all(userId: string) {
    const existingCompany = await this.companyRepository.findOne({
      users: userId,
    });
    if (!existingCompany) {
      return {
        items: new Array<User>(),
      };
    }

    const companyUsers: User[] = await this.userRepository.find({
      _id: existingCompany.users,
    });
    return {
      items: companyUsers,
    };
  }

  async invite(senderId: string, emailTo: string) {
    const user = await this.userRepository.findOne({ _id: senderId });
    if (user?.role !== 'admin') throw new Error('imposible');
    await this.sendgridService.sendEmail({
      to: emailTo,
      subject: `${user.email} invite you`,
      emailBody: this.templatesService.emailUserRegister(
        `${user.email} invite you`,
        '',
      ),
    });
    return {};
  }

  async updateLastLoginDate(user: User) {
    await this.userRepository.updateOne(
      {
        _id: user._id,
      },
      {
        lastLoginAt: Date.now(),
      },
    );
  }
}
