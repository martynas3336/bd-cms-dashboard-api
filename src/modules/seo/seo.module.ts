import { Module } from '@nestjs/common';
import { SeoService } from './seo.service';
import { SeoController } from './seo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoSchema } from './entities/seo.entity';
import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.SEO, schema: SeoSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  controllers: [SeoController],
  providers: [SeoService],
})
export class SeoModule {}
