import {
  Body,
  Controller,
  Headers,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DetailsService } from './details.service';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { ProjectAuthProjectDecorator } from '../auth/project-auth/project-auth.project.decorator';
import { Project } from '../project/entities/project.entity';
import { UpdateDetailsDto } from './dto/update-details.dto';
import { CreateDetailsDto } from './dto/create-details.dto';
import { UpdateDetailsByProductIdRo } from './ro/update-details-by-product-id.ro';
import { UpdateDetailsByIdRo } from './ro/update-details-by-id.ro';
import { CreateDetailsRo } from './ro/create-details.ro';
import { UpdateDetailsByProductIdDto } from './dto/update-details-by-product-id.dto';

@ApiTags('details')
@Controller('api/v1/admin/details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Put('update/by/product/id/:productId')
  @ApiBody({ type: UpdateDetailsByProductIdDto })
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiResponse({ type: UpdateDetailsByProductIdRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.USER_PROJECT)
  async updateDetailsByProductId(
    @Body() detailsData: UpdateDetailsByProductIdDto,
    @Headers() headers: { language?: string },
    @Param('productId') productId: string,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<UpdateDetailsByProductIdRo> {
    return this.detailsService.updateDetailsByProductId(
      project._id,
      headers['language'],
      productId,
      detailsData,
    );
  }

  @Put('update/by/id/:detailsId')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ type: UpdateDetailsByIdRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.USER_PROJECT)
  async updateDetailsById(
    @Param('detailsId') detailsId: string,
    @Body() body: UpdateDetailsDto,
  ): Promise<UpdateDetailsByIdRo> {
    return await this.detailsService.updateDetails(detailsId, body);
  }

  @Post()
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ type: CreateDetailsRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.USER_PROJECT)
  async createDetails(
    @Body() details: CreateDetailsDto,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<CreateDetailsRo> {
    return await this.detailsService.createDetails(details, project._id);
  }
}
