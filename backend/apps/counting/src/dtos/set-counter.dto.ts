import { IsNumber, Max, Min } from 'class-validator';

export default class SetCounterDto {
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'count must be an integer' },
  )
  @Min(-8192)
  @Max(8192)
  count: number;
}
