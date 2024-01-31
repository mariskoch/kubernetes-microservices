import { ConflictException, Injectable } from '@nestjs/common';
import CreateCounterDto from './dtos/create-counter.dto';

export interface Counter {
  name: string;
  count: number;
}

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

  private doesCounterAlreadyExistByName(name: string): boolean {
    return this.counters.some((counter) => counter.name === name);
  }
}
