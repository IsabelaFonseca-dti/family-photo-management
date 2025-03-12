import { IUsersRepository } from '../types/IUsersRepository';

export class UsersManager {
  constructor(private readonly repository: IUsersRepository) {}

  async getUsers() {
    try {
      const users = await this.repository.listUsers();
      return users;
    } catch (error) {
      console.log('Failed to fetch users, error:', error);
    }
  }
}

export default UsersManager;
