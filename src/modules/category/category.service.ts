import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateCategoriesDto,
  CreateCategoryDto,
} from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(ModelNamesEnum.CATEGORY)
    private readonly categoryRepository: Model<Category>,
  ) {}

  async createOne(createCategoryDto: CreateCategoryDto, projectId: string) {
    const category: Category = await this.categoryRepository.create({
      ...createCategoryDto,
      projectId,
    });
    return category;
  }

  async createMany(
    createCategoriesDto: CreateCategoriesDto,
    projectId: string,
  ) {
    await this.categoryRepository.create(
      createCategoriesDto.categoryChilds.map((child) => ({
        language: createCategoriesDto.language,
        categoryParent: createCategoriesDto.categoryParent,
        categoryChild: child,
        projectId,
      })),
    );
    return {};
  }
}
