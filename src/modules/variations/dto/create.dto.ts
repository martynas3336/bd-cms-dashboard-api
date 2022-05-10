import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsLowercase,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateDto {
  @ApiProperty({ required: true, description: 'unique company project id' })
  @IsString()
  projectId: string;

  @ApiProperty({ required: true, description: 'unique company project id' })
  @IsString()
  productId: string;

  @ApiProperty({ required: true, description: 'unique company project id' })
  @IsString()
  @IsLowercase()
  @Length(2, 2)
  language: string;

  @ApiProperty({ description: 'unique company project id' })
  @IsString()
  @Length(2, 255)
  name: string;

  @ApiProperty({ description: 'unique company project id' })
  @IsNumber()
  priceTax: number;

  @ApiProperty({ description: 'unique company project id' })
  @IsNumber()
  priceRegular: number;

  @ApiProperty()
  @IsBoolean()
  isStock: boolean;

  @ApiProperty()
  @IsBoolean()
  noTax: boolean;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsString()
  barcode: string;

  @ApiProperty()
  @IsString({ each: true })
  images: string[];

  @ApiProperty()
  @IsString({ each: true })
  keyWords: string[];
}
