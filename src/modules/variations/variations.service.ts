import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VariationsModuleError } from 'src/exceptions/inner-errors/variations.module.error';
import { Details } from '../details/entities/details.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Variation } from './entities/variation.entity';
import { Image } from 'src/modules/images/entities/image.entity';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class VariationsService {
  constructor(
    @InjectModel(ModelNamesEnum.PRODUCT)
    private readonly productRepository: Model<Product>,
    @InjectModel(ModelNamesEnum.DETAILS)
    private readonly detailsRepository: Model<Details>,
    @InjectModel(ModelNamesEnum.VARIATION)
    private readonly variationRepository: Model<Variation>,
    @InjectModel(ModelNamesEnum.IMAGE)
    private readonly imagesRepository: Model<Image>,
  ) {}

  async get(project: string, language: string, variationId: string) {
    const variation: Variation = await this.variationRepository.findOne({
      projectId: project,
      language,
      _id: variationId,
    });
    return variation;
  }

  async getVariations(projectId: string, language: string) {
    const variations: Variation[] = await this.variationRepository.find({
      projectId,
      language: language,
    });

    return {
      count: variations.length,
      items: variations,
    };
  }

  async delete(project: string, language: string, variationId: string) {
    const deleteResult = await this.variationRepository.deleteOne({
      projectId: project,
      language,
      _id: variationId,
    });
    if (!deleteResult) throw new VariationsModuleError();
    return {};
  }

  async update(
    project: string,
    language: string,
    variationId: string,
    newBody: Partial<Variation>,
  ) {
    const updateResult = await this.variationRepository.updateOne(
      {
        projectId: project,
        language,
        _id: variationId,
      },
      newBody,
    );
    if (!updateResult) throw new VariationsModuleError();
    return {};
  }

  async createVariation(variation: Partial<Variation>, projectId: string) {
    return this.variationRepository.create({
      ...variation,
      projectId,
    });
  }
}
