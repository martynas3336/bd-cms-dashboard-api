import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class VariationAdminDto {
  @ApiProperty({ description: '' })
  @IsString()
  projectId: string;

  @ApiProperty({ description: '' })
  @IsString()
  productId: string;

  @ApiProperty({ description: '' })
  @IsString()
  language: string;

  @ApiProperty({ description: '' })
  @IsString()
  name: string;

  @ApiProperty({ description: '' })
  @IsString()
  companyProductId: string;

  @ApiProperty({ description: '' })
  @IsString()
  barcode: string;

  @ApiProperty({ description: '' })
  @IsString()
  category: string;

  @ApiProperty({ description: '' })
  @IsString()
  gender: string;

  @ApiProperty({ description: '' })
  @IsNumber()
  priceTax: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  priceRegular: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  ordering: number;

  @ApiProperty({ description: '' })
  @IsBoolean()
  isStock: boolean;

  @ApiProperty({ description: '' })
  @IsBoolean()
  noTax: boolean;

  @ApiProperty({ description: '' })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ description: '' })
  @IsArray()
  @IsString({ each: true })
  keyWords: string[];
}
