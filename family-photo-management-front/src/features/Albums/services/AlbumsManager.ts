import { IAlbumsCreationDTO } from '../types/IAlbumCreationDTO';
import { IAlbumsRepository } from '../types/IAlbumsRepository';

export class AlbumsManager {
  constructor(private readonly repository: IAlbumsRepository) {}

  async getAlbumsByUser(userId: string | undefined) {
    try {
      if (userId) {
        const albums = await this.repository.listAlbumsByUser(userId);
        return albums;
      }
      throw Error('UserId was not provided');
    } catch (error) {
      console.log('Failed to fetch albums, error:', error);
    }
  }

  async deleteAlbum(albumId: string | undefined) {
    try {
      if (albumId) {
        await this.repository.deleteAlbum(albumId);
        return;
      }
      throw Error('album id was not provided');
    } catch (error) {
      console.log('Failed to delete album, error:', error);
      throw error;
    }
  }
  async createAlbum(album: IAlbumsCreationDTO) {
    try {
      const createdAlbum = await this.repository.createAlbum(album);
      return createdAlbum;
    } catch (error) {
      console.log('Failed to create album, error:', error);
      throw error;
    }
  }
}

export default AlbumsManager;
