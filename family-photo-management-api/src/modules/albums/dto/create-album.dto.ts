import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateAlbumDTORequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Min(1)
  userId: number;
}

export class CreateAlbumDTOResponse extends CreateAlbumDTORequest {
  id: number;
}
