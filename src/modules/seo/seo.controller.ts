import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SeoService } from './seo.service';
import { CreateSeoDto } from './dto/create-seo.dto';
import { UpdateSeoDto } from './dto/update-seo.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRo } from './ro/create.ro';
import { GetByParamsRo } from './ro/get-by-params.ro';
import { FindAllRo } from './ro/find-all.ro';
import { FindOneRo } from './ro/find-one.ro';
import { UpdateRo } from './ro/update.ro';
import { RemoveRo } from './ro/remove.ro';

@ApiTags('Seo')
@Controller('v1/seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Post()
  @ApiResponse({ status: 200, type: CreateRo })
  create(@Body() createSeoDto: CreateSeoDto): Promise<CreateRo> {
    return this.seoService.create(createSeoDto);
  }

  @Post('get')
  @ApiResponse({ status: 200, type: GetByParamsRo })
  getByParams(@Body() createSeoDto: CreateSeoDto): Promise<GetByParamsRo> {
    return this.seoService.get(createSeoDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: FindAllRo })
  findAll(): Promise<FindAllRo> {
    return this.seoService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: FindOneRo })
  findOne(@Param('id') id: string): Promise<FindOneRo> {
    return this.seoService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: UpdateRo })
  update(
    @Param('id') id: string,
    @Body() updateSeoDto: UpdateSeoDto,
  ): Promise<UpdateRo> {
    return this.seoService.update(id, updateSeoDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: RemoveRo })
  remove(@Param('id') id: string): Promise<RemoveRo> {
    return this.seoService.remove(id);
  }
}
