import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  productId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  language: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  priceTax: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  priceRegular: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isStock: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  noTax: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  barcode: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imagesIds: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  keyWords: string[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  ordering: number;
}
