import { Controller, Post, Body, Patch, Param, Delete, Get } from '@nestjs/common';
import { AlbumsService } from '../services/albums.service';
import { CreateAlbumDTORequest } from '../dto/create-album.dto';
import { UpdateAlbumDTORequest } from '../dto/update-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get(':id/photos')
  listPhotosByAlbum(@Param('id') id: number) {
    return this.albumsService.listPhotosByAlbum(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDTORequest) {
    return this.albumsService.create(createAlbumDto);
  }

  @Patch()
  update(@Param('id') id: number, @Body() updateAlbumDto: UpdateAlbumDTORequest) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<boolean> {
    return this.albumsService.delete(id);
  }
}
