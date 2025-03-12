import { ApiProperty } from '@nestjs/swagger';

export class ListPhotosDTOResponse {
  @ApiProperty()
  albumId: number;
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  thumbnailUrl: string;
}
