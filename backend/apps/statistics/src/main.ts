import { NestFactory } from '@nestjs/core';
import { StatisticsModule } from './statistics.module';

async function bootstrap() {
  const app = await NestFactory.create(StatisticsModule);
  // TODO: Put port back to 3000
  await app.listen(3002);
}
bootstrap();
