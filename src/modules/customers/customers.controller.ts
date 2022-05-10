import { Controller, Get } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { Project } from '../project/entities/project.entity';
import { ProjectAuthProjectDecorator } from '../auth/project-auth/project-auth.project.decorator';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { GetCustomersRo } from './ro/get-customers.ro';

@ApiTags('customers admin')
@Controller('api/v1/admin/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}
  @Get()
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'token' })
  @ApiResponse({ status: 200, type: GetCustomersRo })
  @Auth(AuthGuardsEnum.USER_PROJECT)
  async getOne(
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<GetCustomersRo> {
    return await this.customersService.getCustomers(project._id);
  }
}
