import { IsNumber, Min } from 'class-validator';

export class IdParamDTO {
  @IsNumber()
  @Min(1)
  id: number;
}
