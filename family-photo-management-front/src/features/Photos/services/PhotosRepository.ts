import { Api, API_ROUTES } from '../../../shared/api';
import { interpolateWithValues } from '../../../shared/utils/helpers';

import { IListPhotoDTO } from '../types/IListPhotoDTO';
import { IPhotoCreationDTO } from '../types/IPhotoCreationDTO';
import { IPhotosRepository } from '../types/IPhotosRepository';

export class PhotosRepository implements IPhotosRepository {
  constructor(private readonly api: Api) {}

  async listPhotosByAlbum(albumId: string): Promise<IListPhotoDTO[]> {
    const url = interpolateWithValues(API_ROUTES.GET_PHOTOS_BY_ALBUM, albumId);

    const response = await this.api.get<IListPhotoDTO[]>(url);
    return response?.data;
  }

  async deletePhoto(photoId: string): Promise<void> {
    const url = interpolateWithValues(API_ROUTES.DELETE_PHOTO, photoId);
    await this.api.delete<boolean>(url);
  }

  async createPhoto(photo: IPhotoCreationDTO): Promise<IListPhotoDTO> {
    const url = interpolateWithValues(API_ROUTES.POST_PHOTO);

    const response = await this.api.post<IListPhotoDTO>(url, photo);
    return response?.data;
  }
}

export default PhotosRepository;
