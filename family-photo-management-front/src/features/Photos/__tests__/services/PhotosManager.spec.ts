import { vi, describe, it, expect, afterEach } from 'vitest';
import { PhotosManager } from '../../services/PhotosManager';
import { IPhotosRepository } from '../../types/IPhotosRepository';
import { MOCK_LIST_PHOTOS } from '../mocks/photo.mocks';

describe('Tests on PhotosManager', () => {
  const mockRepository: IPhotosRepository = {
    listPhotosByAlbum: vi.fn(),
    deletePhoto: vi.fn(),
    createPhoto: vi.fn(),
  };
  const photosManager: PhotosManager = new PhotosManager(mockRepository);

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Test getPhotosByAlbum function', () => {
    it('should return null if albumId is undefined', async () => {
      const result = await photosManager.getPhotosByAlbum(undefined);
      expect(result).toBeUndefined();
      expect(mockRepository.listPhotosByAlbum).not.toHaveBeenCalled();
    });

    it('should return photos if albumId is valid', async () => {
      const albumId = 'album123';
      vi.spyOn(mockRepository, 'listPhotosByAlbum').mockResolvedValueOnce(MOCK_LIST_PHOTOS);

      const result = await photosManager.getPhotosByAlbum(albumId);
      expect(result).toEqual(MOCK_LIST_PHOTOS);
      expect(mockRepository.listPhotosByAlbum).toHaveBeenCalledWith(albumId);
    });

    it('should log an error if fetching photos fails', async () => {
      const albumId = 'album123';
      vi.spyOn(mockRepository, 'listPhotosByAlbum').mockRejectedValueOnce(new Error('Failed to fetch'));

      const result = await photosManager.getPhotosByAlbum(albumId);
      expect(result).toBeUndefined();
      expect(mockRepository.listPhotosByAlbum).toHaveBeenCalledWith(albumId);
    });
  });

  describe('Test deletePhoto function', () => {
    it('should throw an error if photoId is undefined', async () => {
      await expect(photosManager.deletePhoto(undefined)).rejects.toThrowError('photoId was not provided');
      expect(mockRepository.deletePhoto).not.toHaveBeenCalled();
    });

    it('should call deletePhoto on repository if photoId is valid', async () => {
      const photoId = 'photo123';

      vi.spyOn(mockRepository, 'deletePhoto').mockResolvedValueOnce(undefined);

      await photosManager.deletePhoto(photoId);
      expect(mockRepository.deletePhoto).toHaveBeenCalledWith(photoId);
    });

    it('should log an error and rethrow if deletion fails', async () => {
      const photoId = 'photo123';
      vi.spyOn(mockRepository, 'deletePhoto').mockRejectedValueOnce(new Error('Failed to delete photo'));

      await expect(photosManager.deletePhoto(photoId)).rejects.toThrowError('Failed to delete photo');
      expect(mockRepository.deletePhoto).toHaveBeenCalledWith(photoId);
    });
  });

  describe('Test createPhoto function', () => {
    it('should create and return photo when photo data is valid', async () => {
      vi.spyOn(mockRepository, 'createPhoto').mockResolvedValueOnce(MOCK_LIST_PHOTOS[0]);

      const result = await photosManager.createPhoto(MOCK_LIST_PHOTOS[0]);
      expect(result).toEqual(MOCK_LIST_PHOTOS[0]);
      expect(mockRepository.createPhoto).toHaveBeenCalledWith(MOCK_LIST_PHOTOS[0]);
    });

    it('should log an error and rethrow if creation fails', async () => {
      vi.spyOn(mockRepository, 'createPhoto').mockRejectedValueOnce(new Error('Failed to create photo'));

      await expect(photosManager.createPhoto(MOCK_LIST_PHOTOS[0])).rejects.toThrowError('Failed to create photo');
      expect(mockRepository.createPhoto).toHaveBeenCalledWith(MOCK_LIST_PHOTOS[0]);
    });
  });
});
