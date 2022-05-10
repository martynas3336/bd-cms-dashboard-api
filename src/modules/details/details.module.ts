import { Module } from '@nestjs/common';
import { DetailsService } from './details.service';
import { DetailsController } from './details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DetailsSchema } from './entities/details.entity';
import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.DETAILS, schema: DetailsSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  controllers: [DetailsController],
  providers: [DetailsService],
  exports: [DetailsService],
})
export class DetailsModule {}
