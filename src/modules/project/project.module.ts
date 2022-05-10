import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './entities/project.entity';
import { ProjectController } from './project.controller';
import { CompanyModule } from 'src/modules/company/company.module';
import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../enums/modelNames.enum';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    CompanyModule,
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.PROJECT, schema: ProjectSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
