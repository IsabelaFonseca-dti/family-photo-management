import { vi, describe, it, expect, afterEach } from 'vitest';
import { AlbumsManager } from '../../services/AlbumsManager';
import { IAlbumsRepository } from '../../types/IAlbumsRepository';
import { MOCK_ALBUMS, MOCK_SELECTED_ALBUM } from '../mocks/album.mock';

describe('Tests on AlbumsManager', () => {
  const mockRepository: IAlbumsRepository = {
    listAlbumsByUser: vi.fn(),
    deleteAlbum: vi.fn(),
    createAlbum: vi.fn(),
  };
  const albumsManager: AlbumsManager = new AlbumsManager(mockRepository);

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Test getAlbumsByUser function', () => {
    it('should return undefined if userId is not provided', async () => {
      const result = await albumsManager.getAlbumsByUser(undefined);
      expect(result).toBeUndefined();
      expect(mockRepository.listAlbumsByUser).not.toHaveBeenCalled();
    });

    it('should return albums if userId is valid', async () => {
      const userId = 'user123';
      vi.spyOn(mockRepository, 'listAlbumsByUser').mockResolvedValueOnce(MOCK_ALBUMS);

      const result = await albumsManager.getAlbumsByUser(userId);
      expect(result).toEqual(MOCK_ALBUMS);
      expect(mockRepository.listAlbumsByUser).toHaveBeenCalledWith(userId);
    });

    it('should log an error if fetching albums fails', async () => {
      const userId = 'user123';
      const errorSpy = vi.spyOn(console, 'log');
      vi.spyOn(mockRepository, 'listAlbumsByUser').mockRejectedValueOnce(new Error('Failed to fetch albums'));

      await albumsManager.getAlbumsByUser(userId);
      expect(errorSpy).toHaveBeenCalledWith('Failed to fetch albums, error:', expect.any(Error));
    });
  });

  describe('Test deleteAlbum function', () => {
    it('should throw an error if albumId is not provided', async () => {
      await expect(albumsManager.deleteAlbum(undefined)).rejects.toThrowError('album id was not provided');
      expect(mockRepository.deleteAlbum).not.toHaveBeenCalled();
    });

    it('should call deleteAlbum on repository if albumId is valid', async () => {
      const albumId = 'album123';
      vi.spyOn(mockRepository, 'deleteAlbum').mockResolvedValueOnce(undefined);

      await albumsManager.deleteAlbum(albumId);
      expect(mockRepository.deleteAlbum).toHaveBeenCalledWith(albumId);
    });

    it('should log an error if deletion fails', async () => {
      const albumId = 'album123';
      const errorSpy = vi.spyOn(console, 'log');
      vi.spyOn(mockRepository, 'deleteAlbum').mockRejectedValueOnce(new Error('Failed to delete album'));

      await expect(albumsManager.deleteAlbum(albumId)).rejects.toThrowError('Failed to delete album');
      expect(errorSpy).toHaveBeenCalledWith('Failed to delete album, error:', expect.any(Error));
    });
  });

  describe('Test createAlbum function', () => {
    it('should create and return album when album data is valid', async () => {
      vi.spyOn(mockRepository, 'createAlbum').mockResolvedValueOnce(MOCK_SELECTED_ALBUM);

      const result = await albumsManager.createAlbum(MOCK_SELECTED_ALBUM);
      expect(result).toEqual(MOCK_SELECTED_ALBUM);
      expect(mockRepository.createAlbum).toHaveBeenCalledWith(MOCK_SELECTED_ALBUM);
    });

    it('should log an error and rethrow if creation fails', async () => {
      const errorSpy = vi.spyOn(console, 'log');
      vi.spyOn(mockRepository, 'createAlbum').mockRejectedValueOnce(new Error('Failed to create album'));

      await expect(albumsManager.createAlbum(MOCK_SELECTED_ALBUM)).rejects.toThrowError('Failed to create album');
      expect(errorSpy).toHaveBeenCalledWith('Failed to create album, error:', expect.any(Error));
    });
  });
});
