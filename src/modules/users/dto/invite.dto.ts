import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InviteDto {
  @ApiProperty({ default: '<your email>' })
  @IsString()
  @IsNotEmpty()
  email: string;
}
