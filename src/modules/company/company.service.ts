import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(ModelNamesEnum.COMPANY)
    private readonly companyRepository: Model<Company>,
  ) {}

  async getCompanyByUserId(userId: string): Promise<Company> {
    return this.companyRepository.findOne({
      users: userId,
    });
  }

  async create(id: string, createCompanyDto: CreateCompanyDto) {
    const existingCompany = this.companyRepository.findOne({
      users: id,
    });
    if (existingCompany) {
      throw new Error('Company already exists for this user');
    }
    const users: string[] = [id];
    const company = await this.companyRepository.create({
      users,
      ...createCompanyDto,
    });
    return {
      id: company._id,
      users,
    };
  }
}
