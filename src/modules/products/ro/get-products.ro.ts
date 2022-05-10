import { ApiProperty } from '@nestjs/swagger';

class Items {
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

export class GetProductsRo {
  @ApiProperty({ type: [Items] })
  items: Items[];
}
