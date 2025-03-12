import { IPhotoCreationDTO } from '../types/IPhotoCreationDTO';
import { IPhotosRepository } from '../types/IPhotosRepository';

export class PhotosManager {
  constructor(private readonly repository: IPhotosRepository) {}

  async getPhotosByAlbum(albumId: string | undefined) {
    try {
      if (albumId) {
        const photos = await this.repository.listPhotosByAlbum(albumId);
        return photos;
      }
      throw Error('albumId was not provided');
    } catch (error) {
      console.log('Failed to fetch photos, error:', error);
    }
  }

  async deletePhoto(photoId: string | undefined) {
    try {
      if (photoId) {
        await this.repository.deletePhoto(photoId);
        return;
      }
      throw Error('photoId was not provided');
    } catch (error) {
      console.log('Failed to delete album, error:', error);
      throw error;
    }
  }

  async createPhoto(photo: IPhotoCreationDTO) {
    try {
      const createdPhoto = await this.repository.createPhoto(photo);
      return createdPhoto;
    } catch (error) {
      console.log('Failed to create photo, error:', error);
      throw error;
    }
  }
}

export default PhotosManager;
