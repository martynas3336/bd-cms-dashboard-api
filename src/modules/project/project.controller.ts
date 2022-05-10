import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create.dto';
import { ProjectService } from './project.service';
import { User } from '../users/entities/user.entity';
import { UsersAuthUserDecorator } from '../auth/users-auth/users-auth.user.decorator';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { CreateRo } from './ro/create.ro';
import { GetRo } from './ro/get.ro';

@ApiTags('API dashboard projects')
@Controller('dashboard/v1/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiHeader({ required: true, name: 'jwtToken' })
  @ApiResponse({ status: 200, type: CreateRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.USER_JWT)
  async create(
    @Body() body: CreateProjectDto,
    @UsersAuthUserDecorator() user: User,
  ): Promise<CreateRo> {
    return await this.projectService.create(user._id, body);
  }

  @Get()
  @ApiHeader({ required: true, name: 'jwtToken' })
  @ApiResponse({ status: 200, type: GetRo })
  @Auth(AuthGuardsEnum.USER_JWT)
  async get(@UsersAuthUserDecorator() user: User): Promise<GetRo> {
    return await this.projectService.get(user._id);
  }
}
