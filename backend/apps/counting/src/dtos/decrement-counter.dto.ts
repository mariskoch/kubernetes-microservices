import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export default class DecrementCounterDto {
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'decrementBy must be an integer' },
  )
  @Min(0)
  @Max(4096)
  decrementBy: number;
}
