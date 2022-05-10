import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { Details } from '../details/entities/details.entity';
import { Variation } from '../variations/entities/variation.entity';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ModelNamesEnum.PRODUCT)
    private readonly productRepository: Model<Product>,
    @InjectModel(ModelNamesEnum.DETAILS)
    private readonly detailsRepository: Model<Details>,
    @InjectModel(ModelNamesEnum.VARIATION)
    private readonly variationRepository: Model<Variation>,
  ) {}

  async get(project: string, language: string, productId: string) {
    const product: Product = await this.productRepository.findOne({
      _id: productId,
    });

    if (!product) throw new Error('Product not found');

    const v: Variation[] = await this.variationRepository
      .find({
        productId,
      })
      .select({
        _id: 1,
        name: 1,
        status: 1,
      });

    return {
      _id: productId,
      status: product.status,
      createdAt: product.createdAt,
      variations: v,
    };
  }

  async updateProduct(
    project: string,
    language: string,
    productId: string,
    body: Partial<Product>,
  ) {
    await this.productRepository.updateOne(
      { projectId: project, language, _id: productId },
      body,
    );
    return {};
  }

  async delete(project: string, language: string, id: string) {
    await this.productRepository.deleteOne({
      _id: id,
      projectId: project,
    });
    await this.detailsRepository.deleteOne({
      productId: id,
      language: language,
      projectId: project,
    });
    await this.variationRepository.deleteMany({
      productId: id,
      language: language,
      projectId: project,
    });

    return {};
  }

  async getProducts(projectId: string, language: string, status?: string) {
    const products: Product[] = await this.productRepository.find({
      projectId,
      language,
      ...(status && { status }),
    });
    return {
      items: products,
    };
  }

  async createProduct(projectId: string) {
    return await this.productRepository.create({
      projectId,
    });
  }

  async getDetailedProducts(projectId: string, language: string) {
    const items = new Array<{
      id: string;
      status: string;
      createdAt: Date;
      variations: Variation[];
    }>();

    const products: Product[] = await this.productRepository.find({
      projectId,
      language,
    });

    await Promise.all(
      products.map(async (product) => {
        const v: Variation[] = await this.variationRepository
          .find({
            productId: product._id,
          })
          .select({
            _id: 1,
            name: 1,
            status: 1,
            images: 1,
            keyWords: 1,
            priceRegular: 1,
            quantity: 1,
          });
        const r = {
          id: product._id,
          status: product.status,
          createdAt: product.createdAt,
          variations: v,
        };
        items.push(r);
      }),
    );

    return {
      count: items.length,
      items: items,
    };
  }
}
