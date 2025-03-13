import { vi, describe, it, expect, afterEach } from 'vitest';
import { UsersManager } from '../../services/UsersManager';
import { IUsersRepository } from '../../types/IUsersRepository';
import { MOCK_USERS } from '../mocks/user.mocks';
describe('Tests on UsersManager', () => {
  const mockRepository: IUsersRepository = {
    listUsers: vi.fn(),
  };
  const usersManager: UsersManager = new UsersManager(mockRepository);

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Test getUsers function', () => {
    it('should return undefined if there is an error fetching users', async () => {
      vi.spyOn(mockRepository, 'listUsers').mockRejectedValueOnce(new Error('Failed to fetch users'));

      const result = await usersManager.getUsers();
      expect(result).toBeUndefined();
      expect(mockRepository.listUsers).toHaveBeenCalled();
    });

    it('should return users if the repository fetches them successfully', async () => {
      vi.spyOn(mockRepository, 'listUsers').mockResolvedValueOnce(MOCK_USERS);

      const result = await usersManager.getUsers();
      expect(result).toEqual(MOCK_USERS);
      expect(mockRepository.listUsers).toHaveBeenCalled();
    });

    it('should log an error if fetching users fails', async () => {
      const errorSpy = vi.spyOn(console, 'log');
      vi.spyOn(mockRepository, 'listUsers').mockRejectedValueOnce(new Error('Failed to fetch users'));

      await usersManager.getUsers();
      expect(errorSpy).toHaveBeenCalledWith('Failed to fetch users, error:', expect.any(Error));
    });
  });
});
