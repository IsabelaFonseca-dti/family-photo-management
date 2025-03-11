import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlbumsService } from '../services/albums.service';
import { CreateAlbumDTOResponse, CreateAlbumDTORequest } from '../dto/create-album.dto';
import { UpdateAlbumDTOResponse, UpdateAlbumDTORequest } from '../dto/update-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDTORequest) {
    return this.albumsService.create(createAlbumDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDTORequest) {
    return this.albumsService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.albumsService.delete(+id);
  }
}
