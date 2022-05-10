import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Details } from './entities/details.entity';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class DetailsService {
  constructor(
    @InjectModel(ModelNamesEnum.DETAILS)
    private readonly detailsRepository: Model<Details>,
  ) {}

  async updateDetailsByProductId(
    project: string,
    language: string,
    id: string,
    body: Partial<Details>,
  ) {
    await this.detailsRepository.updateOne(
      { projectId: project, language, productId: id },
      body,
    );
    return {};
  }

  async updateDetails(detailsId: string, body: Partial<Details>) {
    await this.detailsRepository.updateOne(
      {
        _id: detailsId,
      },
      { ...body },
    );
    return {};
  }

  async createDetails(details: Partial<Details>, projectId: string) {
    details.language = details.language.toLowerCase();
    return await this.detailsRepository.create({
      ...details,
      projectId,
    });
  }
}
