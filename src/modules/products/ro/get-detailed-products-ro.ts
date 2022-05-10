import { ApiProperty } from '@nestjs/swagger';

class ImagePool {
  @ApiProperty()
  id: string;

  @ApiProperty()
  url: string;
}

class Variation {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  lastUpdateAt: Date;

  @ApiProperty()
  lastUpdateBy: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  priceTax: number;

  @ApiProperty()
  priceRegular: number;

  @ApiProperty()
  isStock: boolean;

  @ApiProperty()
  noTax: boolean;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  companyProductId: string;

  @ApiProperty()
  barcode: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  imagesIds: string[];

  @ApiProperty({ type: [ImagePool] })
  imagesPool: ImagePool[];

  @ApiProperty()
  keyWords: string[];

  @ApiProperty()
  ordering: number;
}

class Item {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: [Variation] })
  variations: Variation[];
}

export class GetDetailedProductsRo {
  @ApiProperty()
  count: number;

  @ApiProperty({ type: [Item] })
  items: Item[];
}
