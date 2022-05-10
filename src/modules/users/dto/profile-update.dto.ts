import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProfileUpdateDto {
  @ApiProperty({ default: '<your role>' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  role: string;

  @ApiProperty({ default: '<your name>' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({ default: '<your avatar>' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  avatar: string;

  @ApiProperty({ default: '<your companyName>' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  companyName: string;
}
