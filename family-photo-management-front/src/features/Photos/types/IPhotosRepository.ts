import { IListPhotoDTO } from './IListPhotoDTO';
import { IPhotoCreationDTO } from './IPhotoCreationDTO';

export interface IPhotosRepository {
  listPhotosByAlbum(albumId: string): Promise<IListPhotoDTO[]>;
  deletePhoto(photoId: string): Promise<void>;
  createPhoto(photo: IPhotoCreationDTO): Promise<IListPhotoDTO>;
}
