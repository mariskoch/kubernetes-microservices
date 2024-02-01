import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import Counter from '../../counting/src/counter.interface';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/average')
  async getAverage(): Promise<{ average: number }> {
    return await this.statisticsService.getAverage();
  }

  @Get('/max')
  async getMax(): Promise<Counter> {
    return await this.statisticsService.getExtreme('MAX');
  }

  @Get('/min')
  async getMin(): Promise<Counter> {
    return await this.statisticsService.getExtreme('MIN');
  }
}
