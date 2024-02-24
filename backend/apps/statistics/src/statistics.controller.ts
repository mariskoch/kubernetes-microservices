import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import Counter from '../../../shared/counter.interface';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/average')
  async getAverage(): Promise<{ average: number }> {
    return await this.statisticsService.getAverage();
  }

  @Get('/sum')
  async getSum(): Promise<{ sum: number }> {
    return await this.statisticsService.getSum();
  }

  @Get('/max')
  async getMax(): Promise<Counter> {
    return await this.statisticsService.getExtreme('MAX');
  }

  @Get('/min')
  async getMin(): Promise<Counter> {
    return await this.statisticsService.getExtreme('MIN');
  }

  @Get('/health')
  getHealth(): any {
    return { status: 'Statistics is healthy' };
  }
}
