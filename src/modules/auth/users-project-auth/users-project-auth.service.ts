import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Project } from '../../project/entities/project.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ModelNamesEnum } from '../../../enums/modelNames.enum';
import { Company } from '../../company/entities/company.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersProjectAuthService {
  constructor(
    @InjectModel(ModelNamesEnum.PROJECT)
    private readonly projectRepository: Model<Project>,
    @InjectModel(ModelNamesEnum.COMPANY)
    private readonly companyRepository: Model<Company>,
  ) {}

  async getCompanyByProjectIdAndUserId(
    projectId: string,
    userId: string,
  ): Promise<Company | null> {
    if (!mongoose.isValidObjectId(projectId)) return null;
    if (!mongoose.isValidObjectId(userId)) return null;
    const company = await this.companyRepository.findOne({
      projectId,
      'users._id': new mongoose.Types.ObjectId(userId),
    });
    if (!company) return null;
    return company;
  }
}
