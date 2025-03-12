import { ApiProperty } from '@nestjs/swagger';

export class ListPhotosDTOResponse {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
