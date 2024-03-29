import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import CreateCounterDto from './dtos/create-counter.dto';
import Counter from '../../../shared/counter.interface';
import IncrementCounterDto from './dtos/increment-counter.dto';
import DecrementCounterDto from './dtos/decrement-counter.dto';
import SetCounterDto from './dtos/set-counter.dto';

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
    @Body() decrementCounter: DecrementCounterDto,
  ): Counter {
    return this.appService.decrementCounter(counterName, decrementCounter);
  }

  @Post('/set/:name')
  setCounter(
    @Param('name') counterName: string,
    @Body() setCounter: SetCounterDto,
  ): Counter {
    return this.appService.setCounter(counterName, setCounter);
  }

  @Get('/health')
  getHealth(): any {
    return { status: 'Counting is healthy' };
  }

  @Delete('/delete/:name')
  deleteCounter(@Param('name') counterName: string): { deleted: string } {
    return this.appService.deleteCounter(counterName);
  }
}
