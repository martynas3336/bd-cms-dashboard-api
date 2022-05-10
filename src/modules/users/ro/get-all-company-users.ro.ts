import { ApiProperty } from '@nestjs/swagger';

class Item {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  secretWordHash: string;

  @ApiProperty()
  temporaryToken: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  lastLoginAt: Date;

  @ApiProperty()
  role: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  companyName: string;
}

export class GetAllCompanyUsersRo {
  @ApiProperty({ type: [Item] })
  items: Item[];
}
