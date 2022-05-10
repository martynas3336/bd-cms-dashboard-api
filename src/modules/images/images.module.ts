import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './entities/image.entity';
import { VariationSchema } from '../variations/entities/variation.entity';
import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.IMAGE, schema: ImageSchema }],
      ConnectionNamesEnum.main,
    ),
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.VARIATION, schema: VariationSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
