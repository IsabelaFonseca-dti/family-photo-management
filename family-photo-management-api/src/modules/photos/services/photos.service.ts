import { Injectable } from '@nestjs/common';
import { CreatePhotoDTOResponse, CreatePhotoDTOPostRequest } from '../dto/create-photo.dto';
import { UpdatePhotoDTOResponse, UpdatePhotoDTORequest } from '../dto/update-photo.dto';
import { HttpService } from '@nestjs/axios';
import { ListPhotosDTOResponse } from '../dto/list-photos.dto';

@Injectable()
export class PhotosService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<ListPhotosDTOResponse[]> {
    try {
      const response = await this.httpService.axiosRef.get<ListPhotosDTOResponse[]>('/photos');
      return response.data;
    } catch (e) {
      console.log(`Error while fetching Users: error - ${e}`);
      throw e;
    }
  }

  async create(createPhotoDto: CreatePhotoDTOPostRequest): Promise<CreatePhotoDTOResponse> {
    try {
      const response = await this.httpService.axiosRef.post('/photos', createPhotoDto);
      return response.data;
    } catch (e) {
      console.log(`Error while creating album: ${e}`);
      throw e;
    }
  }

  async update(photoId: number, updatePhotoDto: UpdatePhotoDTORequest): Promise<UpdatePhotoDTOResponse> {
    try {
      const response = await this.httpService.axiosRef.put(`/photos/${photoId}`, updatePhotoDto);
      return response.data;
    } catch (e) {
      console.log(`Error while updating album: ${e}`);
      throw e;
    }
  }

  async delete(photoId: number) {
    try {
      await this.httpService.axiosRef.delete(`/photos/${photoId}`);
      return true;
    } catch (e) {
      console.log(`Error while updating album: ${e}`);
      throw e;
    }
  }
}
