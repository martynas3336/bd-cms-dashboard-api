import { Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BillingService } from './billing.service';
import { GetRo } from './ro/get.ro';

@ApiTags('billing')
@Controller('v1/billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('test')
  @ApiResponse({ status: 200, type: GetRo })
  async get(): Promise<GetRo> {
    return this.billingService.get();
  }
}
