import { ApiProperty } from '@nestjs/swagger';

export class CreateRo {
  @ApiProperty()
  id: string;

  @ApiProperty()
  users: string[];
}
