import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger/dist';
import { CategoryService } from './category.service';
import {
  CreateCategoriesDto,
  CreateCategoryDto,
} from './dto/create-category.dto';
import { Project } from '../project/entities/project.entity';
import { ProjectAuthProjectDecorator } from '../auth/project-auth/project-auth.project.decorator';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { CreateRo } from './ro/create.ro';
import { ApiResponse } from '@nestjs/swagger';
import { CreateManyRo } from './ro/create-many.ro';

@ApiTags('categories')
@Controller('api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create/one')
  @ApiHeader({ name: 'project-id' })
  @ApiResponse({ status: 200, type: CreateRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.USER_PROJECT)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<CreateRo> {
    return this.categoryService.createOne(createCategoryDto, project._id);
  }

  @Post('create/many')
  @ApiHeader({ name: 'project-id' })
  @ApiResponse({ status: 200, type: CreateManyRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.USER_PROJECT)
  createMany(
    @Body() createCategoryDto: CreateCategoriesDto,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<CreateManyRo> {
    return this.categoryService.createMany(createCategoryDto, project._id);
  }
}
