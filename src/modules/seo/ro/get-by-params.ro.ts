import { ApiProperty } from '@nestjs/swagger';

export class GetByParamsRo {
  @ApiProperty()
  id: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  domain: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  changedAt: Date;
}
