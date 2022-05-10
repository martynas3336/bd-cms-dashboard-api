import { ApiProperty } from '@nestjs/swagger';

export class CreateRo {
  @ApiProperty()
  id: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  statusChangedAt: Date;
}
