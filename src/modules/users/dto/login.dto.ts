import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ default: '<your email>' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '<your email>' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
