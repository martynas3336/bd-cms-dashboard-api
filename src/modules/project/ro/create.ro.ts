import { EmailConfirmTypesEnum } from '../../../enums/emailConfirmTypes.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRo {
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
