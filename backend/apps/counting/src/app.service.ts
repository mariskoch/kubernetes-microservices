import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CreateCounterDto from './dtos/create-counter.dto';
import Counter from './counter.interface';

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

  private doesCounterAlreadyExistByName(name: string): boolean {
    return this.counters.some((counter) => counter.name === name);
  }
}
