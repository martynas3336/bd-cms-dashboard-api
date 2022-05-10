import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entities/product.entity';
import { DetailsSchema } from '../details/entities/details.entity';
import { VariationSchema } from '../variations/entities/variation.entity';
import { CompanyModule } from 'src/modules/company/company.module';
import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Module({
  imports: [
    CompanyModule,
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.PRODUCT, schema: ProductSchema }],
      ConnectionNamesEnum.main,
    ),
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.DETAILS, schema: DetailsSchema }],
      ConnectionNamesEnum.main,
    ),
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.VARIATION, schema: VariationSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
