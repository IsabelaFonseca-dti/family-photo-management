import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PhotosService } from '../services/photos.service';
import { ListPhotosDTOResponse } from '../dto/list-photos.dto';
import { CreatePhotoDTOPostRequest } from '../dto/create-photo.dto';
import { UpdatePhotoDTORequest } from '../dto/update-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  findAll(): Promise<ListPhotosDTOResponse[]> {
    return this.photosService.findAll();
  }

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDTOPostRequest) {
    return this.photosService.create(createPhotoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdatePhotoDTORequest) {
    return this.photosService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.photosService.delete(+id);
  }
}
