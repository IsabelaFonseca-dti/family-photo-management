import { Test, TestingModule } from '@nestjs/testing';
import { IdParamDTO } from '../../../../utils/id.dto';
import { UsersController } from '../users.controller';
import { UsersService } from '../../services/users.service';
import { ListUsersDTOResponse } from '../../dto/list-users.dto';
import { ListAlbumsByUserDTOResponse } from '../../dto/list-albums-by-user.dto';
import { BadRequestException } from '@nestjs/common';

describe('Tests on UsersController', () => {
  let controller: UsersController;
  const mockFindAll = jest.fn();
  const mockfindAlbumsByUser = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: mockFindAll,
            findAlbumsByUser: mockfindAlbumsByUser,
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('tests on findAll request', () => {
    const usersMock: ListUsersDTOResponse[] = [
      { id: 1, username: 'user1', email: 'user1@example.com' },
      { id: 2, username: 'user2', email: 'user2@example.com' },
    ];

    it('should return a list of all users', async () => {
      mockFindAll.mockResolvedValueOnce(usersMock);

      const result = await controller.findAll();

      expect(result).toEqual(usersMock);
      expect(mockFindAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('tests on findOne request', () => {
    const albumsMock: ListAlbumsByUserDTOResponse[] = [
      { userId: 1, id: 1, title: 'Album One' },
      { userId: 1, id: 2, title: 'Album Two' },
    ];

    it('should return a list of all albums owned by a user', async () => {
      mockfindAlbumsByUser.mockResolvedValueOnce(albumsMock);

      const idParam: IdParamDTO = { id: 1 };
      const result = await controller.findOne(idParam);

      expect(result).toEqual(albumsMock);
      expect(mockfindAlbumsByUser).toHaveBeenCalledWith(1);
    });

    it('should throw an error if id is invalid (less than 1)', async () => {
      const idParam: IdParamDTO = { id: 0 };

      try {
        await controller.findOne(idParam);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.response.message).toEqual(['id must be a positive number']);
      }
    });

    it('should throw an error if id is missing or invalid type', async () => {
      try {
        await controller.findOne({ id: 'invalid' } as any);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.response.message).toEqual(['id must be a number conforming to the specified constraints']);
      }
    });
  });
});
