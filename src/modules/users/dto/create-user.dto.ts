import { ApiProperty } from '@nestjs/swagger';
import {
  Contains,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: '<your email>' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '<your domain>', required: false })
  @IsString()
  @IsNotEmpty()
  @Contains('https://')
  @IsOptional()
  redirectUrl: string;
}
