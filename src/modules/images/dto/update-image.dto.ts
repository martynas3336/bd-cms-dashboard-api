import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateImageDto {
  @ApiProperty()
  @IsString()
  imageName: string;

  @ApiProperty()
  @IsString()
  variationId: string;
}
