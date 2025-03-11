import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { AlbumsService } from '../services/albums.service';
import { CreateAlbumDTOResponse, CreateAlbumDTORequest } from '../dto/create-album.dto';
import { UpdateAlbumDTOResponse, UpdateAlbumDTORequest } from '../dto/update-album.dto';

describe('Tests on AlbumsService', () => {
  let service: AlbumsService;
  const mockHttpPost = jest.fn();
  const mockHttpPut = jest.fn();
  const mockHttpDelete = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumsService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              post: mockHttpPost,
              put: mockHttpPut,
              delete: mockHttpDelete,
            },
          },
        },
      ],
    }).compile();

    service = module.get<AlbumsService>(AlbumsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
      const axiosResponse: Partial<AxiosResponse<CreateAlbumDTOResponse>> = {
        data: createdAlbum,
        status: 201,
        statusText: 'Created',
      };

      mockHttpPost.mockResolvedValueOnce(axiosResponse);

      const result = await service.create(createAlbumDto);

      expect(result).toEqual(createdAlbum);
      expect(mockHttpPost).toHaveBeenCalledWith('/albums', createAlbumDto);
    });

    it('should throw an error if request fails', async () => {
      mockHttpPost.mockRejectedValueOnce(new Error('Request failed'));

      await expect(service.create(createAlbumDto)).rejects.toThrow('Request failed');
    });
  });

  describe('tests on update', () => {
    const albumId = 1;
    const updateAlbumDto: UpdateAlbumDTORequest = {
      userId: 1,
      title: 'Updated Album',
    };

    const updatedAlbum: UpdateAlbumDTOResponse = {
      id: albumId,
      userId: 1,
      title: 'Updated Album',
    };

    it('should update an album and return it', async () => {
      const axiosResponse: Partial<AxiosResponse<UpdateAlbumDTOResponse>> = {
        data: updatedAlbum,
        status: 200,
        statusText: 'OK',
      };

      mockHttpPut.mockResolvedValueOnce(axiosResponse);

      const result = await service.update(albumId, updateAlbumDto);

      expect(result).toEqual(updatedAlbum);
      expect(mockHttpPut).toHaveBeenCalledWith(`/albums/${albumId}`, updateAlbumDto);
    });

    it('should throw an error if request fails', async () => {
      mockHttpPut.mockRejectedValueOnce(new Error('Request failed'));

      await expect(service.update(albumId, updateAlbumDto)).rejects.toThrow('Request failed');
    });
  });

  describe('tests on delete', () => {
    const albumId = 1;

    it('should delete an album and return true', async () => {
      mockHttpDelete.mockResolvedValueOnce({ status: 200, statusText: 'OK' });

      const result = await service.delete(albumId);

      expect(result).toBe(true);
      expect(mockHttpDelete).toHaveBeenCalledWith(`/albums/${albumId}`);
    });

    it('should throw an error if request fails', async () => {
      mockHttpDelete.mockRejectedValueOnce(new Error('Request failed'));

      await expect(service.delete(albumId)).rejects.toThrow('Request failed');
    });
  });
});
