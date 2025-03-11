import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { PhotosService } from '../photos.service';
import { ListPhotosDTOResponse } from '../../dto/list-photos.dto';
import { CreatePhotoDTOPostRequest, CreatePhotoDTOResponse } from '../../dto/create-photo.dto';
import { UpdatePhotoDTORequest, UpdatePhotoDTOResponse } from '../../dto/update-photo.dto';

describe('Tests on PhotosService', () => {
  let service: PhotosService;
  const mockHttpGet = jest.fn();
  const mockHttpPost = jest.fn();
  const mockHttpPut = jest.fn();
  const mockHttpDelete = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhotosService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              get: mockHttpGet,
              post: mockHttpPost,
              put: mockHttpPut,
              delete: mockHttpDelete,
            },
          },
        },
      ],
    }).compile();

    service = module.get<PhotosService>(PhotosService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('tests on findAll', () => {
    const photosMock: ListPhotosDTOResponse[] = [
      {
        albumId: 1,
        id: 1,
        title: 'Photo One',
        url: 'https://via.placeholder.com/600/92c952',
        thumbnailUrl: 'https://via.placeholder.com/150/92c952',
      },
      {
        albumId: 1,
        id: 2,
        title: 'Photo Two',
        url: 'https://via.placeholder.com/600/771796',
        thumbnailUrl: 'https://via.placeholder.com/150/771796',
      },
    ];

    it('should return a list of all photos', async () => {
      const axiosResponse: Partial<AxiosResponse<ListPhotosDTOResponse[]>> = {
        data: photosMock,
        status: 200,
        statusText: 'OK',
      };

      mockHttpGet.mockResolvedValueOnce(axiosResponse);

      const result = await service.findAll();

      expect(result).toEqual(photosMock);
      expect(mockHttpGet).toHaveBeenCalledWith('/photos');
    });

    it('should throw an error if the request fails', async () => {
      mockHttpGet.mockRejectedValueOnce(new Error('Request failed'));

      await expect(service.findAll()).rejects.toThrow('Request failed');
    });
  });

  describe('create', () => {
    const createPhotoDto: CreatePhotoDTOPostRequest = {
      albumId: 1,
      title: 'New Photo',
      url: 'https://via.placeholder.com/600/new',
      thumbnailUrl: 'https://via.placeholder.com/150/new',
    };

    const createdPhotoResponse: CreatePhotoDTOResponse = {
      id: 101,
      ...createPhotoDto,
    };

    it('should create a new photo', async () => {
      const axiosResponse: Partial<AxiosResponse<CreatePhotoDTOResponse>> = {
        data: createdPhotoResponse,
        status: 201,
        statusText: 'Created',
      };

      mockHttpPost.mockResolvedValueOnce(axiosResponse);

      const result = await service.create(createPhotoDto);

      expect(result).toEqual(createdPhotoResponse);
      expect(mockHttpPost).toHaveBeenCalledWith('/photos', createPhotoDto);
    });

    it('should throw an error if creation fails', async () => {
      mockHttpPost.mockRejectedValueOnce(new Error('Request failed'));

      await expect(service.create(createPhotoDto)).rejects.toThrow('Request failed');
    });
  });

  describe('update', () => {
    const photoId = 1;
    const updatePhotoDto: UpdatePhotoDTORequest = {
      title: 'Updated Photo Title',
      albumId: 1,
      url: 'https://via.placeholder.com/600/new',
      thumbnailUrl: 'https://via.placeholder.com/150/new',
    };

    const updatedPhotoResponse: UpdatePhotoDTOResponse = {
      id: photoId,
      albumId: 1,
      title: updatePhotoDto.title,
      url: 'https://via.placeholder.com/600/updated',
      thumbnailUrl: 'https://via.placeholder.com/150/updated',
    };

    it('should update a photo', async () => {
      const axiosResponse: Partial<AxiosResponse<UpdatePhotoDTOResponse>> = {
        data: updatedPhotoResponse,
        status: 200,
        statusText: 'OK',
      };

      mockHttpPut.mockResolvedValueOnce(axiosResponse);

      const result = await service.update(photoId, updatePhotoDto);

      expect(result).toEqual(updatedPhotoResponse);
      expect(mockHttpPut).toHaveBeenCalledWith(`/photos/${photoId}`, updatePhotoDto);
    });

    it('should throw an error if update fails', async () => {
      mockHttpPut.mockRejectedValueOnce(new Error('Request failed'));

      await expect(service.update(photoId, updatePhotoDto)).rejects.toThrow('Request failed');
    });
  });

  describe('delete', () => {
    const photoId = 1;

    it('should delete a photo and return true', async () => {
      mockHttpDelete.mockResolvedValueOnce({ status: 200 });

      const result = await service.delete(photoId);

      expect(result).toBe(true);
      expect(mockHttpDelete).toHaveBeenCalledWith(`/photos/${photoId}`);
    });

    it('should throw an error if deletion fails', async () => {
      mockHttpDelete.mockRejectedValueOnce(new Error('Request failed'));

      await expect(service.delete(photoId)).rejects.toThrow('Request failed');
    });
  });
});
