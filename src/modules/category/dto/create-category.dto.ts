import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsLowercase,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  @IsLowercase()
  language: string;

  @ApiProperty()
  @IsString()
  @Length(0, 64)
  categoryParent: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 64)
  categoryChild: string;
}

export class CreateCategoriesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  @IsLowercase()
  language: string;

  @ApiProperty()
  @IsString()
  @Length(0, 64)
  categoryParent: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  categoryChilds: string[];
}
