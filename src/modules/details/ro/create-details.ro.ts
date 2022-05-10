import { ApiProperty } from '@nestjs/swagger';

export class CreateDetailsRo {
  @ApiProperty()
  id: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}
