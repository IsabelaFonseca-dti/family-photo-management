import { Body, Controller, Delete, Get, Param, Put, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PhotosService } from '../services/photos.service';
import { ListPhotosDTOResponse } from '../dto/list-photos.dto';
import { CreatePhotoDTOPostRequest } from '../dto/create-photo.dto';
import { UpdatePhotoDTORequest } from '../dto/update-photo.dto';
import { IdParamDTO } from '../../../utils';

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

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') params: IdParamDTO, @Body() updateAlbumDto: UpdatePhotoDTORequest) {
    const { id } = params;
    return this.photosService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  delete(@Param('id') params: IdParamDTO): Promise<boolean> {
    const { id } = params;
    return this.photosService.delete(+id);
  }
}
