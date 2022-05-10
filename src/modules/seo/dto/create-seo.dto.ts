import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSeoDto {
  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsString()
  value: string;
}
