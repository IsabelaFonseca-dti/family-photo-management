import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../../services/users.service';
import { ListUsersDTOResponse } from '../../dto/list-users.dto';
import { ListAlbumsByUserDTOResponse } from '../../dto/list-albums-by-user.dto';

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
      { id: 1, userName: 'user1', email: 'user1@example.com' },
      { id: 2, userName: 'user2', email: 'user2@example.com' },
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
      const userId = albumsMock[0].userId;

      const result = await controller.findOne(userId.toString());

      expect(result).toEqual(albumsMock);
      expect(mockfindAlbumsByUser).toHaveBeenCalledWith(1);
    });
  });
});
