import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import CreateCounterDto from './dtos/create-counter.dto';
import Counter from './counter.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/counters')
  getCounters(): Counter[] {
    return this.appService.getCounters();
  }

  @Get('/counter')
  getCounter(@Query('name') counterName: string): Counter {
    return this.appService.getCounter(counterName);
  }

  @Post('/create')
  createCounter(@Body() createCounter: CreateCounterDto): { name: string } {
    return this.appService.createCounter(createCounter);
  }
}
