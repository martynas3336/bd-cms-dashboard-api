import { Module } from '@nestjs/common';
import { VariationsService } from './variations.service';
import { VariationsController } from './variations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DetailsSchema } from '../details/entities/details.entity';
import { ProductSchema } from '../products/entities/product.entity';
import { VariationSchema } from './entities/variation.entity';
import { ImageSchema } from 'src/modules/images/entities/image.entity';
import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Module({
  imports: [
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
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.IMAGE, schema: ImageSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  controllers: [VariationsController],
  providers: [VariationsService],
})
export class VariationsModule {}
