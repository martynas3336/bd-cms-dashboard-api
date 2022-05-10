import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  Delete,
  Headers,
  UsePipes,
  ValidationPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { ProjectAuthProjectDecorator } from '../auth/project-auth/project-auth.project.decorator';
import { Project } from '../project/entities/project.entity';
import { CreateRo } from './ro/create.ro';
import { GetRo } from './ro/get.ro';
import { DeleteRo } from './ro/delete.ro';
import { UpdateRo } from './ro/update.ro';
import { GetProductsRo } from './ro/get-products.ro';
import { GetDetailedProductsRo } from './ro/get-detailed-products-ro';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('api/v1/admin/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ type: CreateRo })
  @Auth(AuthGuardsEnum.USER_PROJECT, AuthGuardsEnum.USER_JWT)
  async create(
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<CreateRo> {
    return await this.productsService.createProduct(project._id);
  }

  @Get('get/:productId')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiResponse({ type: GetRo })
  @Auth(AuthGuardsEnum.USER_PROJECT, AuthGuardsEnum.USER_JWT)
  async getProduct(
    @Headers() headers: { language?: string },
    @Param('productId') productId: string,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<GetRo> {
    return this.productsService.get(
      project._id,
      headers['language'],
      productId,
    );
  }

  @Delete(':productId')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiResponse({ type: DeleteRo })
  @Auth(AuthGuardsEnum.USER_PROJECT, AuthGuardsEnum.USER_JWT)
  async deleteProduct(
    @Headers() headers: { language?: string },
    @Param('productId') productId: string,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<DeleteRo> {
    return this.productsService.delete(
      project._id,
      headers['language'],
      productId,
    );
  }

  @Put(':productId')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiResponse({ type: UpdateRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.USER_PROJECT, AuthGuardsEnum.USER_JWT)
  async updateProduct(
    @Headers() headers: { language?: string },
    @Body() product: UpdateProductDto,
    @ProjectAuthProjectDecorator() project: Project,
    @Param('productId') productId: string,
  ): Promise<UpdateRo> {
    return await this.productsService.updateProduct(
      project._id,
      headers['language'],
      productId,
      product,
    );
  }

  @Get('get')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiQuery({
    required: false,
    type: Boolean,
    name: 'status',
  })
  @ApiResponse({ type: GetProductsRo })
  @Auth(AuthGuardsEnum.USER_PROJECT, AuthGuardsEnum.USER_JWT)
  async getProducts(
    @Headers() headers: { language?: string },
    @ProjectAuthProjectDecorator() project: Project,
    @Query('status') status: string,
  ): Promise<GetProductsRo> {
    return await this.productsService.getProducts(
      project._id,
      headers['language'],
      status,
    );
  }

  @Get('get-detailed')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiResponse({ status: 200, type: GetDetailedProductsRo })
  @Auth(AuthGuardsEnum.USER_PROJECT, AuthGuardsEnum.USER_JWT)
  async getDetailedProducts(
    @Headers() headers: { language?: string },
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<GetDetailedProductsRo> {
    return this.productsService.getDetailedProducts(
      project._id,
      headers['language'],
    );
  }
}
