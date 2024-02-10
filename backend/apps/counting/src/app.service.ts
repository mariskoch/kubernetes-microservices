import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CreateCounterDto from './dtos/create-counter.dto';
import Counter from '../../../shared/counter.interface';
import IncrementCounterDto from './dtos/increment-counter.dto';
import DecrementCounterDto from './dtos/decrement-counter.dto';
import SetCounterDto from './dtos/set-counter.dto';

@Injectable()
export class AppService {
  private counters: Counter[] = [];

  createCounter(createCounter: CreateCounterDto): { name: string } {
    if (this.doesCounterAlreadyExistByName(createCounter.name)) {
      throw new ConflictException(
        `Counter with name ${createCounter.name} already exists`,
      );
    }
    this.counters.push({ name: createCounter.name, count: 0 });
    return { name: createCounter.name };
  }

  getCounters(): Counter[] {
    return this.counters;
  }

  getCounter(name: string): Counter {
    const counter = this.counters.find((counter) => counter.name === name);
    if (!counter) {
      throw new NotFoundException(`Counter with name ${name} does not exist`);
    }
    return counter;
  }

  incrementCounter(
    name: string,
    incrementCounterOptions?: IncrementCounterDto,
  ): Counter {
    const counter = this.counters.find((counter) => counter.name === name);
    if (!counter) {
      throw new NotFoundException(`Counter with name ${name} does not exist`);
    }
    if (incrementCounterOptions?.incrementBy) {
      counter.count += Math.floor(incrementCounterOptions.incrementBy);
      return counter;
    }
    counter.count++;
    return counter;
  }

  decrementCounter(
    name: string,
    decrementCounterOptions?: DecrementCounterDto,
  ): Counter {
    const counter = this.counters.find((counter) => counter.name === name);
    if (!counter) {
      throw new NotFoundException(`Counter with name ${name} does not exist`);
    }
    if (decrementCounterOptions?.decrementBy) {
      counter.count -= Math.floor(decrementCounterOptions.decrementBy);
      return counter;
    }
    counter.count--;
    return counter;
  }

  setCounter(name: string, setCounterOptions: SetCounterDto): Counter {
    const counter = this.counters.find((counter) => counter.name === name);
    if (!counter) {
      throw new NotFoundException(`Counter with name ${name} does not exist`);
    }
    counter.count = Math.floor(setCounterOptions.count);
    return counter;
  }

  deleteCounter(name: string): void {
    const counter = this.counters.find((counter) => counter.name === name);
    if (!counter) {
      throw new NotFoundException(`Counter with name ${name} does not exist`);
    }
    this.counters = this.counters.filter((counter) => counter.name !== name);
  }

  private doesCounterAlreadyExistByName(name: string): boolean {
    return this.counters.some((counter) => counter.name === name);
  }
}
