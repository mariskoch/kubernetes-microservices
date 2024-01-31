import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export default class IncrementCounterDto {
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'incrementBy must be an integer' },
  )
  @Min(0)
  @Max(4096)
  incrementBy: number;
}
