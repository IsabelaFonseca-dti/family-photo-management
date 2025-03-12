import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateAlbumDTOResponse, CreateAlbumDTORequest } from '../dto/create-album.dto';
import { UpdateAlbumDTOResponse, UpdateAlbumDTORequest } from '../dto/update-album.dto';
import { ListPhotosDTOResponse } from 'src/modules/photos/dto/list-photos.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly httpService: HttpService) {}

  async listPhotosByAlbum(albumId: number): Promise<ListPhotosDTOResponse> {
    try {
      const response = await this.httpService.axiosRef.get(`/albums/${albumId}/photos`);
      return response.data;
    } catch (e) {
      console.log(`Error while creating album: ${e}`);
      throw e;
    }
  }

  async create(createAlbumDto: CreateAlbumDTORequest): Promise<CreateAlbumDTOResponse> {
    try {
      const response = await this.httpService.axiosRef.post('/albums', createAlbumDto);
      return response.data;
    } catch (e) {
      console.log(`Error while creating album: ${e}`);
      throw e;
    }
  }

  async update(albumId: number, updateAlbumDto: UpdateAlbumDTORequest): Promise<UpdateAlbumDTOResponse> {
    try {
      const response = await this.httpService.axiosRef.put(`/albums/${albumId}`, updateAlbumDto);
      return response.data;
    } catch (e) {
      console.log(`Error while updating album: ${e}`);
      throw e;
    }
  }

  async delete(albumId: number) {
    try {
      await this.httpService.axiosRef.delete(`/albums/${albumId}`);
      return true;
    } catch (e) {
      console.log(`Error while updating album: ${e}`);
      throw e;
    }
  }
}
