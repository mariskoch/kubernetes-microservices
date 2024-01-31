import {IsNumber, IsOptional, Max, Min} from 'class-validator';

export default class IncrementCounterDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(4096)
  incrementBy: number;
}
