import { ApiProperty } from '@nestjs/swagger';

class Image {
  @ApiProperty()
  version: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  awsFileName: string;

  @ApiProperty()
  fieldname: string;

  @ApiProperty()
  originalname: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  size: number;
}

class ImageRepo {
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

export class UploadFileRo {
  @ApiProperty()
  awsFileName: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  url: string;

  @ApiProperty({ type: Image })
  image: Image;

  @ApiProperty({ type: ImageRepo })
  imageRepo: ImageRepo;

  @ApiProperty()
  destination: string;

  @ApiProperty()
  encoding: string;

  @ApiProperty()
  fieldname: string;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  originalname: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  size: number;
}
