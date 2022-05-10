import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Headers,
  Put,
  UsePipes,
  ValidationPipe,
  Post,
} from '@nestjs/common';
import { VariationsService } from './variations.service';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { ProjectAuthProjectDecorator } from '../auth/project-auth/project-auth.project.decorator';
import { Project } from '../project/entities/project.entity';
import { GetVariationRo } from './ro/get-variation.ro';
import { UpdateVariationRo } from './ro/update-variation.ro';
import { DeleteRo } from './ro/delete.ro';
import { UpdateDto } from './dto/update.dto';
import { CreateDto } from './dto/create.dto';
import { CreateVariationRo } from './ro/create-variation.ro';
import { GetVariationsRo } from './ro/get-variations.ro';

@ApiTags('variations')
@Controller('api/v1/admin/variations')
export class VariationsController {
  constructor(private readonly variationsService: VariationsService) {}

  @Get()
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiResponse({ status: 200, type: GetVariationsRo })
  @Auth(AuthGuardsEnum.USER_PROJECT, AuthGuardsEnum.USER_JWT)
  async getVariations(
    @Headers() headers: { language?: string },
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<GetVariationsRo> {
    return this.variationsService.getVariations(
      project._id,
      headers['language'],
    );
  }

  @Get(':variationId')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiResponse({ status: 200, type: GetVariationRo })
  @Auth(AuthGuardsEnum.USER_PROJECT, AuthGuardsEnum.USER_JWT)
  async getVariation(
    @Headers() headers: { language?: string },
    @Param('variationId') variationId: string,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<GetVariationRo> {
    return this.variationsService.get(
      project._id,
      headers['language'],
      variationId,
    );
  }

  @Put(':variationId')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiBody({ type: UpdateDto })
  @ApiResponse({ status: 200, type: UpdateVariationRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.USER_PROJECT, AuthGuardsEnum.USER_JWT)
  async updateVariation(
    @Body() newVariationData: UpdateDto,
    @Headers() headers: { language?: string },
    @Param('variationId') variationId: string,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<UpdateVariationRo> {
    return this.variationsService.update(
      project._id,
      headers['language'],
      variationId,
      newVariationData,
    );
  }

  @Delete(':variationId')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiResponse({ status: 200, type: DeleteRo })
  @Auth(AuthGuardsEnum.USER_PROJECT, AuthGuardsEnum.USER_JWT)
  async deleteVariation(
    @Headers() headers: { language?: string },
    @Param('variationId') variationId: string,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<DeleteRo> {
    return this.variationsService.delete(
      project._id,
      headers['language'],
      variationId,
    );
  }

  @Post()
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ type: CreateVariationRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.USER_PROJECT, AuthGuardsEnum.USER_JWT)
  async createVariation(
    @Body() variation: CreateDto,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<CreateVariationRo> {
    return await this.variationsService.createVariation(variation, project._id);
  }
}
