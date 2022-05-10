import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EmailDto {
  @ApiProperty({ default: '<your email>' })
  @IsString()
  @IsNotEmpty()
  email: string;
}
