import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsController } from '../albums.controller';
import { AlbumsService } from '../../services/albums.service';
import { CreateAlbumDTORequest, CreateAlbumDTOResponse } from '../../dto/create-album.dto';
import { UpdateAlbumDTORequest, UpdateAlbumDTOResponse } from '../../dto/update-album.dto';

describe('Tests on AlbumsController', () => {
  let controller: AlbumsController;
  const mockCreate = jest.fn();
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();

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
          },
        },
      ],
    }).compile();

    controller = module.get<AlbumsController>(AlbumsController);
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
      mockCreate.mockResolvedValueOnce(createdAlbum);

      const result = await controller.create(createAlbumDto);

      expect(result).toEqual(createdAlbum);
      expect(mockCreate).toHaveBeenCalledWith(createAlbumDto);
      expect(mockCreate).toHaveBeenCalledTimes(1);
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

      const result = await controller.update(albumId, updateAlbumDto);

      expect(result).toEqual(updatedAlbum);
      expect(mockUpdate).toHaveBeenCalledWith(albumId, updateAlbumDto);
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('tests on delete', () => {
    const albumId = 1;

    it('should delete an album and return true', async () => {
      mockDelete.mockResolvedValueOnce(true);

      const result = await controller.delete(albumId);

      expect(result).toBe(true);
      expect(mockDelete).toHaveBeenCalledWith(albumId);
      expect(mockDelete).toHaveBeenCalledTimes(1);
    });
  });
});
