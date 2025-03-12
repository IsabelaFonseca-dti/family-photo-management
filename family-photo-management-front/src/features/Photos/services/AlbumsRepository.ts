import { Api, API_ROUTES } from '../../../shared/api';
import { interpolateWithValues } from '../../../shared/utils/helpers';
import { IAlbumsCreationDTO } from '../types/IAlbumCreationDTO';
import { IAlbumsByUserDTO } from '../types/IAlbumsByUserDTO';
import { IAlbumsRepository } from '../types/IPhotosRepository';

export class AlbumsRepository implements IAlbumsRepository {
  constructor(private readonly api: Api) {}

  async listAlbumsByUser(userId: string): Promise<IAlbumsByUserDTO[]> {
    const url = interpolateWithValues(API_ROUTES.GET_ALBUMS_BY_USER, userId);

    const response = await this.api.get<IAlbumsByUserDTO[]>(url);
    return response?.data;
  }

  async deleteAlbum(albumId: string): Promise<void> {
    const url = interpolateWithValues(API_ROUTES.DELETE_ALBUMS, albumId);

    await this.api.delete<IAlbumsByUserDTO[]>(url);
  }

  async createAlbum(album: IAlbumsCreationDTO): Promise<IAlbumsByUserDTO> {
    const url = interpolateWithValues(API_ROUTES.POST_ALBUM);

    const response = await this.api.post<IAlbumsByUserDTO>(url, album);
    return response?.data;
  }
}

export default AlbumsRepository;
