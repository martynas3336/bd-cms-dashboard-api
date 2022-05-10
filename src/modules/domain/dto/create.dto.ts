import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 63)
  domain: '';
}
