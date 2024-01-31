import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export default class DecrementCounterDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(4096)
  decrementBy: number;
}
