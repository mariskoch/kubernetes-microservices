import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import Counter from '../../counting/src/counter.interface';

@Injectable()
export class StatisticsService {
  async getAverage(): Promise<{ average: number }> {
    const counters = await this.fetchCounters();
    if (!counters.length) return { average: 0 };
    const sum = counters.reduce((acc, counter) => acc + counter.count, 0);
    return { average: sum / counters.length };
  }

  async getExtreme(which: 'MIN' | 'MAX'): Promise<Counter> {
    const counters = await this.fetchCounters();
    if (!counters.length) throw new NotFoundException('No counters found');
    return counters.reduce((acc, counter) => {
      if (
        (counter.count > acc.count && which === 'MAX') ||
        (counter.count < acc.count && which === 'MIN')
      )
        return counter;
      return acc;
    });
  }

  private async fetchCounters(): Promise<Counter[]> {
    try {
      // TODO: replace with call to ClusterIP service of counting
      const counters = await fetch('http://localhost:3001/counters');
      return (await counters.json()) as Counter[];
    } catch (error) {
      throw new InternalServerErrorException('Could not fetch counters');
    }
  }
}
