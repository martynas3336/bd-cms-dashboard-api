import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ description: '' })
  @IsString()
  @IsOptional()
  status?: string;
}
