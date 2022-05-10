import { ApiProperty } from '@nestjs/swagger';

class Item {
  @ApiProperty()
  id: string;

  @ApiProperty({ default: '' })
  domain: string;

  @ApiProperty({ default: '' })
  projectId: string;

  @ApiProperty({ type: Date, default: Date.now })
  createdAt: Date;
}

export class GetAllRo {
  @ApiProperty({ type: [Item] })
  items: Item[];
}
