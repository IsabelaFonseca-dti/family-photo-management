import { IAlbumsCreationDTO } from './IAlbumCreationDTO';
import { IAlbumsByUserDTO } from './IAlbumsByUserDTO';

export interface IAlbumsRepository {
  listAlbumsByUser(userId: string): Promise<IAlbumsByUserDTO[]>;
  deleteAlbum(albumId: string): Promise<void>;
  createAlbum(album: IAlbumsCreationDTO): Promise<IAlbumsByUserDTO>;
}
