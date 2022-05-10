import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Domain } from './entities/domain.entity';
import { Model } from 'mongoose';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class DomainService {
  constructor(
    @InjectModel(ModelNamesEnum.DOMAIN)
    private readonly domainRepository: Model<Domain>,
  ) {}

  async create(domain: string, projectId: string) {
    const domainRep = await this.domainRepository.create({ domain, projectId });
    return {
      _id: domainRep._id,
    };
  }

  async getAll(projectId: string) {
    const domains: Domain[] = await this.domainRepository.find({ projectId });
    return {
      items: domains,
    };
  }
}
