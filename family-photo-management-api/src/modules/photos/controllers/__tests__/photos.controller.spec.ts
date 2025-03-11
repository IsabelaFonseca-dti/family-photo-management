import { Test, TestingModule } from '@nestjs/testing';
import { PhotosController } from '../photos.controller';
import { PhotosService } from '../../services/photos.service';
import { ListPhotosDTOResponse } from '../../dto/list-photos.dto';
import { CreatePhotoDTOResponse, CreatePhotoDTOPostRequest } from '../../dto/create-photo.dto';
import { UpdatePhotoDTOResponse, UpdatePhotoDTORequest } from '../../dto/update-photo.dto';

describe('Tests on PhotosController', () => {
  let controller: PhotosController;

  const mockFindAll = jest.fn();
  const mockCreate = jest.fn();
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotosController],
      providers: [
        {
          provide: PhotosService,
          useValue: {
            findAll: mockFindAll,
            create: mockCreate,
            update: mockUpdate,
            delete: mockDelete,
          },
        },
      ],
    }).compile();

    controller = module.get<PhotosController>(PhotosController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('tests on findAll', () => {
    const photosMock: ListPhotosDTOResponse[] = [
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

    it('should return a list of all photos', async () => {
      mockFindAll.mockResolvedValueOnce(photosMock);

      const result = await controller.findAll();

      expect(result).toEqual(photosMock);
      expect(mockFindAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('tests on create', () => {
    const createPhotoDto: CreatePhotoDTOPostRequest = {
      albumId: 1,
      title: 'New Photo',
      url: 'https://example.com/new-photo.jpg',
      thumbnailUrl: 'https://example.com/new-photo-thumb.jpg',
    };

    const createdPhoto: CreatePhotoDTOResponse = {
      id: 3,
      ...createPhotoDto,
    };

    it('should create a new photo and return it', async () => {
      mockCreate.mockResolvedValueOnce(createdPhoto);

      const result = await controller.create(createPhotoDto);

      expect(result).toEqual(createdPhoto);
      expect(mockCreate).toHaveBeenCalledWith(createPhotoDto);
      expect(mockCreate).toHaveBeenCalledTimes(1);
    });
  });

  describe('tests on update', () => {
    const photoId = 1;
    const updatePhotoDto: UpdatePhotoDTORequest = {
      title: 'Updated Title',
      albumId: 1,
      url: 'https://example.com/new-photo.jpg',
      thumbnailUrl: 'https://example.com/new-photo-thumb.jpg',
    };

    const updatedPhoto: UpdatePhotoDTOResponse = {
      id: photoId,
      albumId: 1,
      title: 'Updated Title',
      url: 'https://example.com/photo1.jpg',
      thumbnailUrl: 'https://example.com/photo1-thumb.jpg',
    };

    it('should update a photo and return the updated photo', async () => {
      mockUpdate.mockResolvedValueOnce(updatedPhoto);

      const result = await controller.update(photoId.toString(), updatePhotoDto);

      expect(result).toEqual(updatedPhoto);
      expect(mockUpdate).toHaveBeenCalledWith(photoId, updatePhotoDto);
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('tests on delete', () => {
    const photoId = 1;

    it('should delete a photo and return true', async () => {
      mockDelete.mockResolvedValueOnce(true);

      const result = await controller.delete(photoId.toString());

      expect(result).toBe(true);
      expect(mockDelete).toHaveBeenCalledWith(photoId);
      expect(mockDelete).toHaveBeenCalledTimes(1);
    });
  });
});
