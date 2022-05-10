import { EmailConfirmTypesEnum } from '../../../enums/emailConfirmTypes.enum';
import { ApiProperty } from '@nestjs/swagger';

class Item {
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  companyId: string;

  @ApiProperty()
  emailConfirmUrl: string;

  @ApiProperty()
  emailConfirmType: EmailConfirmTypesEnum;

  @ApiProperty()
  anonymousEmailConfirmType: EmailConfirmTypesEnum;
}

export class GetRo {
  @ApiProperty({ type: [Item] })
  items: Item[];
}
