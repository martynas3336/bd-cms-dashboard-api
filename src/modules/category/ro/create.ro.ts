import { ApiProperty } from '@nestjs/swagger';

export class CreateRo {
  @ApiProperty()
  id: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  categoryParent: string;

  @ApiProperty()
  categoryChild: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  nameEnglish: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  images: string[];
}
