import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from '../../project/entities/project.entity';
import { CompaniesSchema } from '../../company/entities/company.entity';
import { ConnectionNamesEnum } from '../../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../../enums/modelNames.enum';
import { UsersProjectAuthService } from './users-project-auth.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.PROJECT, schema: ProjectSchema }],
      ConnectionNamesEnum.main,
    ),
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.COMPANY, schema: CompaniesSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  providers: [UsersProjectAuthService],
  exports: [UsersProjectAuthService],
})
export class UsersProjectAuthModule {}
