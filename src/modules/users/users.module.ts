import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { SendgridModule } from '../sendgrid/sendgrid.module';
import { CompanyModule } from 'src/modules/company/company.module';
import { EmailTemplatesModule } from 'src/modules/email-templates/email-templates.module';
import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../enums/modelNames.enum';
import { AuthModule } from '../auth/auth.module';
import { UsersAuthModule } from '../auth/users-auth/users-auth.module';
import { CompaniesSchema } from '../company/entities/company.entity';

@Module({
  imports: [
    AuthModule,
    UsersAuthModule,
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.USER, schema: UserSchema }],
      ConnectionNamesEnum.main,
    ),
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.COMPANY, schema: CompaniesSchema }],
      ConnectionNamesEnum.main,
    ),
    EmailTemplatesModule,
    SendgridModule,
    CompanyModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
