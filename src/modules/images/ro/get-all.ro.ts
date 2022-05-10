import { ApiProperty } from '@nestjs/swagger';

class Item {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  awsFileName: string;

  @ApiProperty()
  bucket: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  size: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  createdAt: Date;
}

export class GetAll {
  @ApiProperty({ type: [Item] })
  items: Item[];
}
