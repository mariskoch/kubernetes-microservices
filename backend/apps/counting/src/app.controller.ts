import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService, Counter } from './app.service';
import CreateCounterDto from './dtos/create-counter.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/counters')
  getCounters(): Counter[] {
    return this.appService.getCounters();
  }

  @Post('/create')
  createCounter(@Body() createCounter: CreateCounterDto): { name: string } {
    return this.appService.createCounter(createCounter);
  }
}
