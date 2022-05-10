import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customer } from './entities/customer.entity';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(ModelNamesEnum.CUSTOMER)
    private readonly customerRepository: Model<Customer>,
  ) {}

  async getCustomers(projectId: string) {
    const customers = await this.customerRepository.find({
      projectId,
    });
    return {
      items: customers,
    };
  }
}
