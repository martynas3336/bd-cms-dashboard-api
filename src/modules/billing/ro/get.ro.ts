import { ApiProperty } from '@nestjs/swagger';

class TimePeriod {
  @ApiProperty()
  Start: string;

  @ApiProperty()
  End: string;
}

class AmortizedCost {
  @ApiProperty()
  Amount: string;
}

class Total {
  @ApiProperty({ type: AmortizedCost })
  AmortizedCost: AmortizedCost;
}

class ResultByTime {
  @ApiProperty({ type: Total })
  Total: Total;

  @ApiProperty({ type: TimePeriod })
  TimePeriod?: TimePeriod;
}

export class GetRo {
  @ApiProperty({ type: [ResultByTime] })
  ResultsByTime: ResultByTime[];
}
