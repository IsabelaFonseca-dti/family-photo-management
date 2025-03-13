import { Controller, Post, Body, Put, Param, Delete, Get } from '@nestjs/common';
import { AlbumsService } from '../services/albums.service';
import { CreateAlbumDTORequest } from '../dto/create-album.dto';
import { UpdateAlbumDTORequest } from '../dto/update-album.dto';
import { IdParamDTO } from '../../../utils';
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get(':id/photos')
  listPhotosByAlbum(@Param() { id }: IdParamDTO) {
    return this.albumsService.listPhotosByAlbum(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDTORequest) {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  update(@Param() { id }: IdParamDTO, @Body() updateAlbumDto: UpdateAlbumDTORequest) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  delete(@Param() { id }: IdParamDTO): Promise<boolean> {
    return this.albumsService.delete(id);
  }
}
