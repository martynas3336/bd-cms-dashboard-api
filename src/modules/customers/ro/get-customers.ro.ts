import { CustomerStatusesEnum } from '../../../enums/customerStatuses.enum';
import { CustomerTypesEnum } from '../../../enums/customerTypes.enum';
import { ApiProperty } from '@nestjs/swagger';

class CompanyDetails {
  @ApiProperty()
  companyName: string;

  @ApiProperty()
  companyLegalCode: string;

  @ApiProperty()
  companyTaxCode: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  localAdministration: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  house: string;

  @ApiProperty()
  flat: string;

  @ApiProperty()
  postCode: string;
}

class Item {
  @ApiProperty()
  id: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  status: CustomerStatusesEnum;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  passwordHash: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  localAdministration: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  house: string;

  @ApiProperty()
  flat: string;

  @ApiProperty()
  postCode: string;

  @ApiProperty({ type: CompanyDetails })
  companyDetails: CompanyDetails;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  modifiedAt: Date;

  @ApiProperty()
  codeExpire: Date;

  @ApiProperty()
  passwordResetDate: Date;

  @ApiProperty()
  type: CustomerTypesEnum;
}

export class GetCustomersRo {
  @ApiProperty({ type: [Item] })
  items: Item[];
}
