import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDetailsDto {
  @ApiProperty({ description: '' })
  @IsString()
  name: string;

  @ApiProperty({ description: '' })
  @IsString()
  description: string;
}
