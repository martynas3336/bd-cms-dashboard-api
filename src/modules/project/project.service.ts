import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyService } from 'src/modules/company/company.service';
import { Company } from 'src/modules/company/entities/company.entity';
import { Project } from './entities/project.entity';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(ModelNamesEnum.PROJECT)
    private readonly projectRepository: Model<Project>,
    private readonly companyService: CompanyService,
  ) {}

  async create(userId: string, body: Partial<Project>) {
    const company: Company = await this.companyService.getCompanyByUserId(
      userId,
    );
    if (!company) throw new Error('No company found');
    return await this.projectRepository.create({
      ...body,
      companyId: company._id,
    });
  }

  async get(userId: string) {
    const company: Company = await this.companyService.getCompanyByUserId(
      userId,
    );
    if (!company) throw new Error('');
    const items = await this.projectRepository.find({ companyId: company._id });
    return {
      items,
    };
  }
}
