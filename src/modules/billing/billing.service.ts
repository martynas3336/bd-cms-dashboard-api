import { Injectable } from '@nestjs/common';
import {
  CostExplorerClient,
  GetCostAndUsageCommand,
} from '@aws-sdk/client-cost-explorer';
import { config } from '../../config';

@Injectable()
export class BillingService {
  private costExplorerClient: CostExplorerClient;
  constructor() {
    this.costExplorerClient = new CostExplorerClient({
      apiVersion: '2017-10-25',
      region: config.awsCostExplorerRegion,
      credentials: {
        accessKeyId: config.awsCostExplorerBillingAccessKeyId,
        secretAccessKey: config.awsCostExplorerBillingSecretAccessKey,
      },
    });
  }

  async get() {
    const usages = await this.costExplorerClient.send(
      new GetCostAndUsageCommand({
        TimePeriod: {
          Start: '2021-01-01',
          End: '2021-12-30',
        },
        Granularity: 'MONTHLY',
        Metrics: [
          'BLENDED_COST',
          'UNBLENDED_COST',
          'AMORTIZED_COST',
          'NET_AMORTIZED_COST',
          'NET_UNBLENDED_COST',
          'USAGE_QUANTITY',
          'NORMALIZED_USAGE_AMOUNT',
        ],
      }),
    );
    return {
      ResultsByTime: usages.ResultsByTime.map((usage) => ({
        Total: {
          AmortizedCost: {
            Amount: usage.Total.AmortizedCost.Amount,
          },
        },
        TimePeriod: {
          Start: usage.TimePeriod.Start,
          End: usage.TimePeriod.End,
        },
      })),
    };
  }
}
