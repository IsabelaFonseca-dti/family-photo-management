import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ListUsersDTOResponse } from '../dto/list-users.dto';
import { ListAlbumsByUserDTOResponse } from '../dto/list-albums-by-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<ListUsersDTOResponse[]> {
    try {
      const response = await this.httpService.axiosRef.get<ListUsersDTOResponse[]>('/users');
      return response.data;
    } catch (e) {
      console.log(`Error while fetching Users: error - ${e}`);
      throw e;
    }
  }

  async findAlbumsByUser(userId: number): Promise<ListAlbumsByUserDTOResponse[]> {
    try {
      const response = await this.httpService.axiosRef.get(`/users/${userId}/albums`);
      return response.data;
    } catch (e) {
      console.log(`Error while fetching Albums of user ${userId}: error - ${e}`);
      throw e;
    }
  }
}
