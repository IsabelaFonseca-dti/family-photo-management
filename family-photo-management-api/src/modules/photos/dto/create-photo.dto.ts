import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ListPhotosDTOResponse } from './list-photos.dto';

export class CreatePhotoDTOResponse extends ListPhotosDTOResponse {}

export class CreatePhotoDTOPostRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Min(1)
  albumId: number;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  thumbnailUrl: string;
}
