import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AlbumsController } from '../albums.controller';
import { AlbumsService } from '../../services/albums.service';
import { CreateAlbumDTORequest, CreateAlbumDTOResponse } from '../../dto/create-album.dto';
import { UpdateAlbumDTORequest, UpdateAlbumDTOResponse } from '../../dto/update-album.dto';
import { IdParamDTO } from '../../../../utils';

describe('Tests on AlbumsController', () => {
  let controller: AlbumsController;
  const mockCreate = jest.fn();
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();
  const mockListPhotosByAlbum = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumsController],
      providers: [
        {
          provide: AlbumsService,
          useValue: {
            create: mockCreate,
            update: mockUpdate,
            delete: mockDelete,
            listPhotosByAlbum: mockListPhotosByAlbum,
          },
        },
      ],
    }).compile();

    controller = module.get<AlbumsController>(AlbumsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('tests on listPhotosByAlbum', () => {
    const photosMock = [
      {
        albumId: 1,
        id: 1,
        title: 'Photo 1',
        url: 'https://example.com/photo1.jpg',
        thumbnailUrl: 'https://example.com/photo1-thumb.jpg',
      },
      {
        albumId: 1,
        id: 2,
        title: 'Photo 2',
        url: 'https://example.com/photo2.jpg',
        thumbnailUrl: 'https://example.com/photo2-thumb.jpg',
      },
    ];

    it('should return a list of photos for the album', async () => {
      mockListPhotosByAlbum.mockResolvedValueOnce(photosMock);

      const idParam: IdParamDTO = { id: 1 };
      const result = await controller.listPhotosByAlbum(idParam);

      expect(result).toEqual(photosMock);
      expect(mockListPhotosByAlbum).toHaveBeenCalledWith(1);
      expect(mockListPhotosByAlbum).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if id is invalid or missing', async () => {
      try {
        await controller.listPhotosByAlbum({ id: 'invalid' } as any);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.response.message).toEqual(['id must be a number conforming to the specified constraints']);
      }
    });
  });

  describe('tests on create', () => {
    const createAlbumDto: CreateAlbumDTORequest = {
      userId: 1,
      title: 'New Album',
    };

    const createdAlbum: CreateAlbumDTOResponse = {
      id: 1,
      userId: 1,
      title: 'New Album',
    };

    it('should create an album and return it', async () => {
      mockCreate.mockResolvedValueOnce(createdAlbum);

      const result = await controller.create(createAlbumDto);

      expect(result).toEqual(createdAlbum);
      expect(mockCreate).toHaveBeenCalledWith(createAlbumDto);
      expect(mockCreate).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if body is invalid (missing required fields)', async () => {
      try {
        await controller.create({} as any);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.response.message).toEqual(['userId should be a number', 'title should not be empty']);
      }
    });
  });

  describe('tests on update', () => {
    const albumId = 1;
    const updateAlbumDto: UpdateAlbumDTORequest = {
      title: 'Updated Album',
      userId: 1,
    };

    const updatedAlbum: UpdateAlbumDTOResponse = {
      id: 1,
      userId: 1,
      title: 'Updated Album',
    };

    it('should update an album and return it', async () => {
      mockUpdate.mockResolvedValueOnce(updatedAlbum);

      const result = await controller.update({ id: albumId }, updateAlbumDto);

      expect(result).toEqual(updatedAlbum);
      expect(mockUpdate).toHaveBeenCalledWith(albumId, updateAlbumDto);
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if id is invalid', async () => {
      try {
        await controller.update({ id: 'invalid' } as any, updateAlbumDto);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.response.message).toEqual(['id must be a number conforming to the specified constraints']);
      }
    });

    it('should throw an error if body is invalid (missing required fields)', async () => {
      try {
        await controller.update({ id: albumId }, {} as any);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.response.message).toEqual(['title should not be empty', 'userId should be a number']);
      }
    });
  });

  describe('tests on delete', () => {
    const albumId = 1;

    it('should delete an album and return true', async () => {
      mockDelete.mockResolvedValueOnce(true);

      const result = await controller.delete({ id: albumId });

      expect(result).toBe(true);
      expect(mockDelete).toHaveBeenCalledWith(albumId);
      expect(mockDelete).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if id is invalid for delete', async () => {
      try {
        await controller.delete({ id: 'invalid' } as any);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.response.message).toEqual(['id must be a number conforming to the specified constraints']);
      }
    });
  });
});
