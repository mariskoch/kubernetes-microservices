import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import CreateCounterDto from './dtos/create-counter.dto';
import Counter from './counter.interface';
import IncrementCounterDto from './dtos/increment-counter.dto';
import DecrementCounterDto from "./dtos/decrement-counter.dto";

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

  @Post('/increment/:name')
  incrementCounter(
    @Param('name') counterName: string,
    @Body() incrementCounter: IncrementCounterDto,
  ): Counter {
    return this.appService.incrementCounter(counterName, incrementCounter);
  }

  @Post('/decrement/:name')
    decrementCounter(
        @Param('name') counterName: string,
        @Body() decrementCounter: DecrementCounterDto
    ): Counter {
        return this.appService.decrementCounter(counterName, decrementCounter);
    }
}
