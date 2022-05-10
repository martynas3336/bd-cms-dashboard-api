import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '../users/entities/user.entity';
import { UsersAuthUserDecorator } from '../auth/users-auth/users-auth.user.decorator';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { CreateRo } from './ro/create.ro';

@ApiTags('API dashboard companies')
@Controller('dashboard/v1/companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiHeader({ required: true, name: 'jwtToken' })
  @ApiResponse({ status: 200, type: CreateRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.USER_JWT)
  async create(
    @Body() body: CreateCompanyDto,
    @UsersAuthUserDecorator() user: User,
  ): Promise<CreateRo> {
    return await this.companyService.create(user._id, body);
  }
}
