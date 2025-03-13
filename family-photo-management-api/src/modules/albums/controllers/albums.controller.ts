import { Controller, Post, Body, Put, Param, Delete, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { AlbumsService } from '../services/albums.service';
import { CreateAlbumDTORequest } from '../dto/create-album.dto';
import { UpdateAlbumDTORequest } from '../dto/update-album.dto';
import { IdParamDTO } from '../../../utils';
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get(':id/photos')
  @UsePipes(new ValidationPipe({ transform: true }))
  listPhotosByAlbum(@Param('id') params: IdParamDTO) {
    const { id } = params;
    return this.albumsService.listPhotosByAlbum(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDTORequest) {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') params: IdParamDTO, @Body() updateAlbumDto: UpdateAlbumDTORequest) {
    const { id } = params;
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  delete(@Param('id') params: IdParamDTO): Promise<boolean> {
    const { id } = params;
    return this.albumsService.delete(id);
  }
}
