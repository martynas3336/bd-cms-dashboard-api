import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DomainService } from './domain.service';
import { CreateRo } from './ro/create.ro';
import { CreateDto } from './dto/create.dto';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { ProjectAuthProjectDecorator } from '../auth/project-auth/project-auth.project.decorator';
import { Project } from '../project/entities/project.entity';
import { GetAllRo } from './ro/get-all.ro';

@ApiTags('domain')
@Controller('dashboard/v1/domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  @ApiBody({ type: CreateDto })
  @ApiResponse({ status: 200, type: CreateRo })
  @ApiHeader({ name: 'project-id' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.USER_JWT, AuthGuardsEnum.USER_PROJECT)
  create(
    @Body() body: CreateDto,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<CreateRo> {
    return this.domainService.create(body.domain, project._id);
  }

  @Get()
  @ApiResponse({ status: 200, type: GetAllRo })
  @ApiHeader({ name: 'project-id' })
  @Auth(AuthGuardsEnum.USER_JWT, AuthGuardsEnum.USER_PROJECT)
  getAll(@ProjectAuthProjectDecorator() project: Project): Promise<GetAllRo> {
    return this.domainService.getAll(project._id);
  }
}
