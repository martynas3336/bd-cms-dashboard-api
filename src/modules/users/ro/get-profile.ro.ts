import { ApiProperty } from '@nestjs/swagger';

export class GetProfileRo {
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
