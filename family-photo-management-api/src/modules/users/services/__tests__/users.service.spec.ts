import { Test, TestingModule } from '@nestjs/testing';

import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { UsersService } from '../users.service';
import { ListUsersDTOResponse } from '../../dto/list-users.dto';
import { ListAlbumsByUserDTOResponse } from '../../dto/list-albums-by-user.dto';

describe('Tests on UsersService', () => {
  let service: UsersService;
  const mockHttpGet = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              get: mockHttpGet,
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('tests on findAll', () => {
    const usersMock: ListUsersDTOResponse[] = [
      { id: 1, username: 'user1', email: 'user1@example.com' },
      { id: 2, username: 'user2', email: 'user2@example.com' },
    ];

    it('should return a list of all available users', async () => {
      const axiosResponse: Partial<AxiosResponse<ListUsersDTOResponse[]>> = {
        data: usersMock,
        status: 200,
        statusText: 'OK',
      };

      mockHttpGet.mockResolvedValueOnce(axiosResponse);

      const result = await service.findAll();

      expect(result).toEqual(usersMock);
      expect(mockHttpGet).toHaveBeenCalledWith('/users');
    });

    it('should thrown an error if requests failed', async () => {
      mockHttpGet.mockRejectedValueOnce(new Error('Request failed'));

      await expect(service.findAll()).rejects.toThrow('Request failed');
    });
  });

  describe('findAlbumsByUser', () => {
    const albumsMock: ListAlbumsByUserDTOResponse[] = [
      { userId: 1, id: 1, title: 'Album One' },
      { userId: 1, id: 2, title: 'Album Two' },
    ];
    it('should returns albums by user id', async () => {
      const axiosResponse: Partial<AxiosResponse<ListAlbumsByUserDTOResponse[]>> = {
        data: albumsMock,
        status: 200,
        statusText: 'OK',
      };
      const userId = albumsMock[0].userId;

      mockHttpGet.mockResolvedValueOnce(axiosResponse);

      const result = await service.findAlbumsByUser(userId);

      expect(result).toEqual(albumsMock);
      expect(mockHttpGet).toHaveBeenCalledWith(`/users/${userId}/albums`);
    });

    it('should returns an empty list if user doenst have any albums', async () => {
      const axiosResponse: Partial<AxiosResponse<ListAlbumsByUserDTOResponse[]>> = {
        data: [],
        status: 200,
        statusText: 'OK',
      };
      const userId = 100;

      mockHttpGet.mockResolvedValueOnce(axiosResponse);

      const result = await service.findAlbumsByUser(userId);

      expect(result).toEqual([]);
      expect(mockHttpGet).toHaveBeenCalledWith(`/users/${userId}/albums`);
    });

    it('should thrown an error if requests failed', async () => {
      const userId = albumsMock[0].userId;
      mockHttpGet.mockRejectedValueOnce(new Error('Request failed'));

      await expect(service.findAlbumsByUser(userId)).rejects.toThrow('Request failed');
    });
  });
});
