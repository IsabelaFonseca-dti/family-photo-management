import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class IdParamDTO {
  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number(value))
  id: number;
}
