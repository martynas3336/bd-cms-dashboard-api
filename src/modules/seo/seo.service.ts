import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSeoDto } from './dto/create-seo.dto';
import { UpdateSeoDto } from './dto/update-seo.dto';
import { Seo } from './entities/seo.entity';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class SeoService {
  constructor(
    @InjectModel(ModelNamesEnum.SEO) private readonly seoRepository: Model<Seo>,
  ) {}

  async create(createSeoDto: CreateSeoDto) {
    return await this.seoRepository.create({ ...createSeoDto });
  }

  async get(createSeoDto: CreateSeoDto) {
    return await this.seoRepository.findOne(createSeoDto);
  }

  async findAll() {
    const items = await this.seoRepository.find();
    return { items };
  }

  async findOne(id: string) {
    return this.seoRepository.findOne({ _id: id });
  }

  async update(id: string, updateSeoDto: UpdateSeoDto) {
    await this.seoRepository.updateOne({ _id: id }, updateSeoDto);
    return {};
  }

  async remove(id: string) {
    await this.seoRepository.deleteOne({ _id: id });
    return {};
  }
}
